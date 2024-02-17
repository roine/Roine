---
path: /how-i-built-a-ui-that-consumes-a-shell-output-using-websockets
title: How I built a UI that consumes a shell output using websockets
date: '2024-02-15T23:08:48.793Z'
tags: [tutorial]
---
On my last project we were lacking a simple tool, aggregated notification. 
With many repositories to maintain, it was very difficult to know who and when a PR was opened, reviewed
or commented on. 

Fortunately, despite the lack of features, the API was live and well. Now to consume that API I needed a token, my shell 
session has one (required to push and pull). So there I went, built a shell script to go through 
each repository, check for all the open pull requests and get some extra info such as the author, the review stage, 
the comment count and more. 

Great, everything worked like a charm, I would execute my command wait for 5 minutes and have a list of open PR 
with details and a link it. Oh, wait I forgot, I don't have patience...I want to see my PRs as soon I think about it, not in 5 minutes.
So what did I do?! I built a UI (browser) that would execute the shell script every 10 minutes.

#### The server
I had two options, use http or websockets. The problem with http is that the response would have to be quick in order
to close the request/response loop. With websocket, on the other hand, I could send a request and listen for a response.

The server is what is going to interface with the UI and the shell, my bridge. So what do I need here? On one side, 
I need the UI to request my websocket server and listen for a response. On the other side, I need my websocket server to 
spawn a shell command and emit the response either as it comes or as a whole. My shell command produces output as it 
navigates the repositories, so let's go with emitting each output as they come. That'll give me more updates to my UI. 
```shell
server.register('list-pull-requests', () => {
  const cmd = spawn('show_prs', { shell: '/bin/zsh' });
  cmd.stdout.on('data', (data) => {
    console.log(data.toString());
    server.emit('pr-updates', data.toString());
  });

  cmd.stderr.on('data', (data) => {
    server.emit('pr-updates', data.toString());
  });

  return null;
});
```
So, we see above that the server is waiting for a `list-pull-requests` message, once received it will execute the shell,
read the output and send it back to the client (output is formatted in a way that is easy to parse for the client). 


#### The client
Alright, we have a server that is able to execute shell commands and pass the output to any client. So let's see how to build
a UI using React.

There is two reasons to request pull requests, first when the user clicks the refresh button and second periodically, at 
arbitrary interval. In both case, we call this function
```typescript
  const onRequestPRListing = () => {
    void client.call('list-pull-requests');
  };
```
Here, I used `void` because the responses are handled elsewhere. 

Let's see how we handle the response, but first here's an example of data streaming from our websocket server.
```
START
aTitte, aName, aDate 
bTitle, bName, bDate
END
```
Why do we have `START` and `END`? As we receive a virtually infinite stream of data, it is important to put an edge on each
response group (grouped by request). Also, notice that the data is comma separated, just like a csv file.

Additionally, we will store the parsed response in the localStorage, so if we reload the page we'll be able to see something. Right,
let's see the some code.
```typescript
React.useEffect(() => {
    if (connectionStatus !== 'opened') {
        return;
    }

    client.on('pr-updates', (update) => {
        if (update.includes('START')) {
            setPrList([]); // clear the data on start
            return;
        } else if (update.includes('END')) {
            localStorage.setItem('prs', JSON.stringify({ date: new Date(), data: prList }));
            setPRListDate(new Date()); // so we know when the data was fetched
            return;
        } else {
            const [title, name, date] =
                update.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

            setPrList([
                ...prList,
                {
                    title,
                    name,
                    date: date.toISOString()
                }
            ]);
        }
    });
}, [prList, connectionStatus]);
```

I won't go in much more details as the rest is implementation details.

In summary, we created a websocket server that executes shell command, read the output and transmit it to a client as it comes.
We also created a client that sends requests to the websocket server and listen to responses. We also parsed the string response
to transform it into an object for clint state. 
