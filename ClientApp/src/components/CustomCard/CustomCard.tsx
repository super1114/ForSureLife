import React from 'react';
import './CustomCard.css';

interface Props {
    className?: string;
    children: React.ReactNode;
    title?:string;
    description?:string;
}


const CustomCard = (props: Props)=> {
    const  { className, children,title,description } = props;

    return(
        <div className={`${className ? className : ''} custom-card`}>
            <h2>{title}</h2>
            <p>{description}</p>
            {children}
        </div>
    )
}

export default CustomCard;
