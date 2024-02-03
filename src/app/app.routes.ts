import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LoginVerifyComponent } from './login-verify/login-verify.component';
import { verifyGuard } from './guards/verify.guard';
import { ForumComponent } from './forum/forum.component';
import { PageTemplateComponent } from './page-template/page-template.component';
import { UsersComponent } from './users/users.component';
import { loginGuard } from './guards/LoginGuard/login.guard';
import { isLoginGuard } from './guards/IsLoginGuard/is-login.guard';
import { ForumCommentsComponent } from './forum-comments/forum-comments.component';
import { PendingCommentsComponent } from './pending-comments/pending-comments.component';
import { CallbackComponent } from './callback/callback.component';
import { pendingGuard } from './guards/PendingGuard/pending.guard';
import { userGuard } from './guards/UserGuard/user.guard';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent, canActivate: [loginGuard] },
    { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
    { path: 'login-verify', component: LoginVerifyComponent, canActivate: [verifyGuard] },
    { path: 'callback', component: CallbackComponent, canActivate: [loginGuard] },
    {
        path: '', component: PageTemplateComponent, canActivate: [isLoginGuard], children: [
            { path: 'user', component: UsersComponent, canActivate: [userGuard] },
            { path: 'forum', component: ForumComponent },
            { path: 'forum/:id', component: ForumCommentsComponent },
            { path: 'pending-comments', component: PendingCommentsComponent, canActivate: [pendingGuard] },
            { path: '', pathMatch: 'full', redirectTo: '/forum' }
        ]
    },


];
