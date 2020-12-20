import { Redirect, Route, Switch } from "react-router-dom"
import { AuthPage } from "./pages/auth-page"
import { CreatePage } from "./pages/create-page"
import { DetailPage } from "./pages/detail-page"
import { LinksPage } from "./pages/links-page"

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
