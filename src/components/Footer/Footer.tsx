import './Footer.css';
import React from 'react';

export default function Footer () {
    return (
        <footer>
            <span className='footer-column'>{/* placeholder */}</span>
            <span className='footer-column'>{/* placeholder */}</span>
            <span className='footer-column'>{/* placeholder */}</span>
            <span className='footer-column'>{/* placeholder */}</span>
            <span className='footer-column'>{/* placeholder */}</span>
            <span className='footer-column'>
                <a href="https://github.com/Emmet-Finance/" className='footer-link'>
                    <img src='./social/github.svg' alt='GitHub' className='footer-image' />
                <span className='footer-link-text'>GitHub</span></a>
            </span>
            <span className='footer-column'>
                <a href="https://t.me/Emmet_Finance/" className='footer-link'>
                <img src='./social/telegram.svg' alt='Telegram' className='footer-image' />
                <span className='footer-link-text'>Telegram</span>
                </a>
                
            </span>
            <span className='footer-column'>
                <a href="https://twitter.com/Emmet_Finance/" className='footer-link'>
                <img src='./social/twitter.svg' alt='Twitter' className='footer-image' />
                <span className='footer-link-text'>Twitter</span>
                </a>
                
            </span>
            <span className='footer-column'>
                <a href="https://discord.gg/MTcrqnDP" className='footer-link'>
                <img src='./social/discord.svg' alt='Discord' className='footer-image' />
                <span className='footer-link-text'>Discrod</span>
                </a>
                
            </span>
            <span className='footer-column'>{/* placeholder */}</span>
            <span className='footer-column'>{/* placeholder */}</span>
            <span className='footer-column'>{/* placeholder */}</span>
            <span className='footer-column'>{/* placeholder */}</span>
            <span className='footer-column'>{/* placeholder */}</span>
        </footer>
    )
}