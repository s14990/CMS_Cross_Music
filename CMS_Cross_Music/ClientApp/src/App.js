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
import Show_Users from './components/Show_Users';
import Edit_User from './components/Edit_User';

import MediaFiles from './components/MediaFiles';
import Profile from './components/Profile';



export default () => (
    <Layout>
        <Route exact path='/' component={Posts} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route path='/upload' component={Upload_Video} />
        <Route path='/show_video/:id' component={Show_Video} />
        <Route path='/all_videos' component={Videos} />
        <Route path='/all_posts' component={Posts} />
        <Route path='/add_post' component={Add_Post} />
        <Route path='/show_post/:id' component={Show_Post} />
        <Route path='/signup' component={SignUp} />
        <Route path='/messages/:id' component={MessageList} />
        <Route path='/users' component={Show_Users} />
        <Route path='/edit_user/:id' component={Edit_User} />
        <Route exact path='/mediafiles/:id' component={MediaFiles} />
        <Route exact path='/mediafiles' component={MediaFiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <Route exact path='/profile' component={Profile} />    
    </Layout>
);

