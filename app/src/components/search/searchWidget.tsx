import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSongs, ISongsState } from "../../store";
import { Dispatch } from "redux";
import { List, ListItemText, ListItem } from "@material-ui/core";

export interface ISearchWidgetOwnProps {}

export interface ISearchWidgetStateProps {
    songs: ISongsState;
}

export interface ISearchWidgetDispatchProps {}

export type ISearchWidgetProps = ISearchWidgetOwnProps & ISearchWidgetStateProps & ISearchWidgetDispatchProps;

export class UnconnectedSearchWidget extends React.Component<ISearchWidgetProps, {}> {
    public render() {
        const { songs } = this.props;
        return (
            <div className="search-widget">
                <List>{Object.keys(songs).map(this.renderSong)}</List>
            </div>
        );
    }

    private renderSong = (songId: string) => {
        const { songs } = this.props;
        const song = songs[songId];
        if (song === undefined) {
            return null;
        }
        const { title, artist } = song;
        return (
            <ListItem divider={true} key={songId}>
                <ListItemText primary={title} secondary={artist} />
            </ListItem>
        );
    };
}

function mapStateToProps(state: IAppState, _ownProps: ISearchWidgetOwnProps): ISearchWidgetStateProps {
    return {
        songs: selectSongs(state),
    };
}

function mapDispatchToProps(_dispatch: Dispatch, _ownProps: ISearchWidgetOwnProps): ISearchWidgetDispatchProps {
    return {};
}

export const SearchWidget = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UnconnectedSearchWidget);
