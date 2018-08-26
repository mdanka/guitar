import * as firebase from "firebase/app";
import "firebase/firestore";
import { STORE, SetSongs, ISongsState } from "../store";
import { ISongApi } from "../commons";

export class DataService {
    private static COLLECTION_SONGS = "songs";

    private firestore: firebase.firestore.Firestore;

    public constructor(firestore: firebase.firestore.Firestore) {
        this.firestore = firestore;
        this.subscribeToSongs();
    }

    public subscribeToSongs = () => {
        this.firestore
            .collection(DataService.COLLECTION_SONGS)
            .onSnapshot((querySnaphot: firebase.firestore.QuerySnapshot) => {
                const songs: ISongsState = {};
                querySnaphot.forEach(doc => {
                    songs[doc.id] = doc.data() as ISongApi;
                });
                STORE.dispatch(SetSongs.create({ songs }));
            });
    };
}
