import * as React from 'react';

export default function GetAllPostDesign({post}) {
    let pricePercent = 0;
    if(post.priceInit){
      pricePercent = Math.round((post.priceInit - post.priceNow) / post.priceInit * 100);
    }
    return (
        <div className='post'>
          <div className='postInfos'>
            <div className='postInfosPrimary'>
              <div className='postLogo'>
                <img src="logo192.png" alt='avatar' />
              </div>
              <div className='postPrixTitle'>
                <div className='postTitle'>
                  <h2>{post.title}</h2>
                </div>
                <div className='postPrix'>
                  <p className='priceNow'>{post.priceNow}€</p>
                  {post.priceInit?
                    <>
                      <p className='priceInit'>{post.priceInit}€</p>
                      <p className='pricePercent'>{pricePercent}%</p>
                    </>
                  : <></>}
                </div>
              </div>
            </div>

            <div className='postInfosSecondary'>
              <p>Description: {post.description}</p>
            </div>

            <div className='postInfosTertiary'>
              <div className='postAuthor'>
                {post.author?
                  <>
                    <img src="logo512.png" className='postAuthorAvatar' alt='avatar' />
                    <p>{post.author.userName}</p>
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
          </div>

          <div className='postBouton'>
            <div className='postBoutonPol'>
              -PoL+
            </div>

            <div className='postBoutonComment'>
              -Comment-
            </div>

            <div className='postBoutonUrl'>
              -Url-
            </div>
          </div>
        </div>
    );
  }