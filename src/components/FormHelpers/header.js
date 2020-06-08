import React from 'react';
import { mapRoutesToName } from '../../constants';


export default function ({ headerTitle, isAuthForm, headerStyleClass }) {
    return (
        <div>
                <h1 className={headerStyleClass}>{headerTitle}</h1>
                {isAuthForm && <p className='text-xs-center'>
                        {headerTitle === mapRoutesToName['/login']?
                        <a style={{ color: '#5cb85c'}} href={'/register'}>{'Need an account?'}</a>:
                        <a style={{ color: '#5cb85c'}} href={'/login'}>{'Have an account?'}</a>}
                 </p>}
        </div>
    )
}