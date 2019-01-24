import React from 'react'
import { Link } from 'gatsby'
import kebabCase from "lodash/kebabCase"

function Tags({tags, style}) {
    return (
        <ul style={{listStyle: 'none', display: 'flex', background: '#f8f8f8', ...style}}>
            {tags.map((tag,i) => 
                <li style={{margin: '0 10px 0 0'}} key={i}>
                    <Link style={{
                        fontWeight: 'bold', 
                        fontSize: '0.6rem', 
                        color: 'black', 
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        boxShadow: 'none',
                        padding: '5px',
                        verticalAlign: 'middle',
                    }} to={`/tags/${kebabCase(tag)}/`}>
                        {tag}
                    </Link>
                </li>
            )}
        </ul>
    )
}

export default Tags;