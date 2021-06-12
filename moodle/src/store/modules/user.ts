import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import http from "@/util/http";

@Module({namespaced: true, name: 'User'})

class User extends VuexModule {
    public user: User | null = null
    public token: string | null = localStorage.getItem('token') || null

    @Mutation
    public setUser(payload: User): void {
        this.user = payload;
    }
    public setToken(payload: string): void {
        this.token = payload
    }
    @Action
    public signIn(): void {
        http.get('/signin')
            .then(res => {
                console.log(res.data)
                this.context.commit('setUser', res.data)
            })
    }
    public signUp(): Promise<void> {
        return new Promise(resolve => {
            http.get('/signup')
                .then(res => {
                    console.log(res.data)
                    resolve()
                })
        })
    }
}


export default User
