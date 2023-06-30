import * as React from 'react';
import { Link } from "react-router-dom";

export default function GetAllPostDesign({post}) {
    return (
        <div className='post'>
          <div className='postInfos'>
            <Link to={`/${post?.id}`} className="link">
              <div className='postInfosPrimary'>
                <div>
                      {post.imagePost === "" && (
                        <img src="logo.png" className='postLogo' alt='no' />
                      )}
                      {post.imagePost !== "" && (
                        <img src={post.imagePost} className='postLogo' alt='not found' />
                      )}            
                </div>
                <div className='postPrixTitle'>
                  <div className='postTitle'>
                    <h2>{post.title}</h2>
                  </div>
                </div>
              </div>

              <div className='postInfosSecondary'>
                <p>Description: {post.description}</p>
              </div>
              
              <div className="separator"/>
              <div className='postInfosTertiary'>
                <div className='postAuthor'>
                  {post.author?
                    <>
                      {post.author.avatar === "" && (
                        <img src="logo.png" className='postAuthorAvatar' alt='avatar' />
                      )}
                      {post.author.avatar !== "" && (
                        <img src={post.author.avatar} className='postAuthorAvatar' alt='avatar' />
                      )}
                    </>
                  : <></>}
                </div>

                <div className='postCategories'>
                  {post.categories?
                    <>
                      {post.categories?.map((category)=> {
                        return(
                          <p key={category.id} className='postCategory'>{category.name}</p>
                        )
                      })}
                    </>
                      : <></>
                  }
                </div>

                <div className='postDates'>
                  <div className='postDate'>
                    <p>Créé le: {post.createdAt}</p>
                  </div>
                  <div className='postDate'>
                    <p>{post.promoDuration}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className='postBouton'>
            <div className='postBoutonPol'>
                <div className='postBoutonPolDown'>
                  <p>-</p>
                </div>
                <div className='postBoutonPolNumber'>
                  <p>0</p>
                </div>
                <div className='postBoutonPolUp'>
                  <p>+</p>
                </div>
            </div>

            <div className='postBoutonComment'>
              <div className='postBoutonCommentIcon'>
                <img src="comment.png" alt='avatar' />
              </div>
              <p>{post.comments?.length}</p>
            </div>

            <div className='postBoutonUrl'>
              <Link to={post.webSite}>
                <div className='postBoutonUrlIcon'>
                  <img src="url.png" alt='avatar' />
                </div>
              </Link>
            </div>
          </div>
        </div>
    );
  }