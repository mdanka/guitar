import * as firebase from "firebase/app";
import "firebase/auth";
import { SetCurrentUser, IAppState } from "../store";
import { GET_NAV_URL, Page } from "../utils";
import { Store } from "redoodle";

/**
 * FirebaseUI doesn't support server-side rendering,
 * so we have to avoid importing it.
 */
const firebaseui = (global as any).IS_SERVER_SIDE === undefined ? require("firebaseui") : undefined;

export class FirebaseAuthUiService {
    private firebaseAuthUi: any;

    private defaultFirebaseAuthUiConfig = {
        signInSuccessUrl: GET_NAV_URL[Page.Home](),
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        tosUrl: "/terms-of-service",
        privacyPolicyUrl: "/privacy-policy",
        callbacks: {
            signInSuccessWithAuthResult: (authResult: any) => {
                this.setUser(authResult.user);
                // Do not redirect.
                return true;
            },
        },
    };

    public constructor(private store: Store<IAppState> | undefined) {
        this.firebaseAuthUi = firebaseui === undefined ? undefined : new firebaseui.auth.AuthUI(firebase.auth());
    }

    public authStart = (element: string | Element, signInSuccessUrl: string | undefined) => {
        this.firebaseAuthUi.start(element, this.getFirebaseAuthUiConfig(signInSuccessUrl));
    };

    private setUser = (user: firebase.User | null) => {
        const userOrUndefined = user === null ? undefined : user;
        if (this.store !== undefined) {
            this.store.dispatch(SetCurrentUser.create({ currentUser: userOrUndefined }));
        }
    };

    private getFirebaseAuthUiConfig = (signInSuccessUrl?: string) => {
        return signInSuccessUrl === undefined
            ? this.defaultFirebaseAuthUiConfig
            : {
                  ...this.defaultFirebaseAuthUiConfig,
                  signInSuccessUrl,
              };
    };
}
