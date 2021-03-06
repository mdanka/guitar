import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSongsOrderedByCreationTimeDesc } from "../../store";
import { Dispatch } from "redux";
import { List, ListItemText, ListItem } from "@material-ui/core";
import { Page } from "../../utils";
import { Link } from "react-router-dom";
import { NavUtils, getSongWithPlaceholders } from "../../utils";
import { ISong } from "../../commons";

export interface ISearchWidgetOwnProps {}

export interface ISearchWidgetStateProps {
    songs: ISong[];
}

export interface ISearchWidgetDispatchProps {}

export type ISearchWidgetProps = ISearchWidgetOwnProps & ISearchWidgetStateProps & ISearchWidgetDispatchProps;

export class UnconnectedSearchWidget extends React.Component<ISearchWidgetProps, {}> {
    public render() {
        const { songs } = this.props;
        return (
            <div className="search-widget">
                <List>{songs.map(this.renderSong)}</List>
            </div>
        );
    }

    private renderSong = (song: ISong) => {
        const { id } = song;
        const { title: fullTitle, artist: fullArtist } = getSongWithPlaceholders(song);
        return (
            <Link key={id} to={NavUtils.getNavUrl[Page.Song](id)}>
                <ListItem button divider={true}>
                    <ListItemText primary={fullTitle} secondary={fullArtist} />
                </ListItem>
            </Link>
        );
    };
}

function mapStateToProps(state: IAppState, _ownProps: ISearchWidgetOwnProps): ISearchWidgetStateProps {
    return {
        songs: selectSongsOrderedByCreationTimeDesc(state),
    };
}

function mapDispatchToProps(_dispatch: Dispatch, _ownProps: ISearchWidgetOwnProps): ISearchWidgetDispatchProps {
    return {};
}

export const SearchWidget = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UnconnectedSearchWidget);
