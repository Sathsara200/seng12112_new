import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Login, ShowLoading } from './app.actions';
import { AuthService } from '../../services/auth/auth.service';
import { tap } from 'rxjs';

export interface AppStateModel {
    loading: boolean;
    access_token?: string;
    email?: string;
    token?: string;
}

@State<AppStateModel>({
    name: 'app',
    defaults: { loading: false, email: 'example@gmail.com' },
})
@Injectable({ providedIn: 'root' })
export class AppState {

    @Selector() static loading(state: AppStateModel){
        return state.loading
    }

    @Selector() static email(state: AppStateModel){
        return state.email
    }

    constructor(private authService: AuthService) {}

    @Action(ShowLoading)
    showLoading(
        { patchState }: StateContext<AppStateModel>,
        { loading }: ShowLoading
    ) {
        return patchState({ loading });
    }

    @Action(Login)
    login({ patchState }: StateContext<AppStateModel>, {username, password}: Login) {
      return this.authService.signIn(username, password).pipe(tap((response) => {
        const { access_token } = response ;
        patchState({ access_token });
      }))
    }
}