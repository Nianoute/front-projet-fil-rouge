import * as React from 'react';

export default function GetAllPostDesign({post}) {
    return (
      <>
        <div>Le titre: {post.title}
          <ul>
            <li>la desc: {post.description}</li>
            <li>l'id: {post.id}</li>
          </ul>
        </div>
      </>
    );
  }