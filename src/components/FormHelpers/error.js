import React from 'react';

export default function ({ error, errorTextStyle }){
    return (
        <div>
            <ul>
                {Object.keys(error).map((err) => {
                        const value = error[err];
                        return value && value.map((reasonText,index) => 
                            <li key={index} style={errorTextStyle}>{`${err} ${reasonText}`}
                        </li>) 
                    }
                )}
            </ul>
    </div>
    )
}