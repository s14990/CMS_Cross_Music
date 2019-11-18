import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Upload_Video from './components/Upload_Video';
import Show_Video from './components/Show_Video';
import Login from './components/Login';
import Videos from './components/Videos';
import Add_Post from './components/Add_Post';
import Posts from './components/Posts';
import Show_Post from './components/Show_Post';
import SignUp from './components/SignUp';
import MessageList from './components/MessageList';
import Logout from './components/Logout';

import './themes/bootstrap_flat.css';


export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route path='/upload_video' component={Upload_Video} />
        <Route path='/show_video/:id' component={Show_Video} />
        <Route path='/all_videos' component={Videos} />
        <Route path='/all_posts' component={Posts} />
        <Route path='/add_post' component={Add_Post} />
        <Route path='/show_post/:id' component={Show_Post} />
        <Route path='/signup' component={SignUp} />
        <Route path='/messages/:id' component={MessageList} />
    </Layout>
);
