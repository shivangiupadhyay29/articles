import React from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthorLink from '../FormHelpers/authorLink';
import { postComment, placeholderComment, defaultImageSrc } from '../../constants';
import Error from '../FormHelpers/error';


export default (props) => {
  const { isCommentList, authorUsername, createdAt, image, body:formValues={}, error,loading,
  comment: { id:commentId = {} , createdAt:commentDate, body:commentContent, author:{ username:commentAuthorUsername, image:commentImage } = {} } = {},
  deleteComment = null, addComment = null, onChangeHandler = null} = props;
  const { body } = formValues;
  const textAreaValue = body?body: commentContent?commentContent:'';
  const imgSrc = image ?image: commentImage?commentImage:defaultImageSrc;


    return   (<div className={'col-xs-12 col-md-8 offset-md-2'}>
                {error && <div>
                            <Error errorTextStyle={{ listStyle:'none', textAlign:'center',color: `#b85c5c`, fontWeight: '700' }}
                                    error={error}
                             />
                </div>}
    <Form className={'card'} style={{ marginTop: 3+'rem'}} onSubmit={addComment}>
            <div className={'card-block'}>
                    <Form.Control as="textarea" rows="8"  placeholder={placeholderComment} name={'body'} 
                               value={ textAreaValue } onChange={onChangeHandler} />
            </div>
            <div className={'card-footer'}>
                <div style={{display:'inline-flex'}}>
                    <img alt={'alt'} src={imgSrc}/>
                            { isCommentList && <span>
                                <AuthorLink 
                                    authorUsername={authorUsername || commentAuthorUsername}
                                    createdAt={createdAt || commentDate}
                                    link={true}
                                    inline={true}
                                />
                            </span> }
                </div>
                { isCommentList?
                  <span style={{float:'right'}} onClick={deleteComment(commentId)}> 
                      <i className='fa fa-trash  fa-1x'></i>
                  </span>
                  :<span  style={{float:'right'}}>
                        <Button variant="success" type="submit" disabled={loading}>{postComment}</Button>
                    </span>
                 }
            </div>
        </Form>
    </div>)
}