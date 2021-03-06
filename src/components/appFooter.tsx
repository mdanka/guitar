import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../store";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";
import { Page, NavUtils } from "../utils";
import { MuiThemeProvider } from "@material-ui/core";
import { DARK_THEME, CONTACT_HREF } from "../utils";

export interface IAppFooterOwnProps {}

export interface IAppFooterStateProps {}

export interface IAppFooterDispatchProps {}

export interface IAppFooterLocalState {}

export type IAppFooterProps = IAppFooterOwnProps & IAppFooterStateProps & IAppFooterDispatchProps;

export class UnconnectedAppFooter extends React.Component<IAppFooterProps, IAppFooterLocalState> {
    public render() {
        return (
            <div className="app-footer">
                <MuiThemeProvider theme={DARK_THEME}>
                    <span className="app-footer-item">
                        <Link className="underline" to={NavUtils.getNavUrl[Page.TermsOfService]()}>
                            Terms of Service
                        </Link>
                    </span>
                    {this.renderSeparator()}
                    <span className="app-footer-item">
                        <Link className="underline" to={NavUtils.getNavUrl[Page.PrivacyPolicy]()}>
                            Privacy Policy
                        </Link>
                    </span>
                    {this.renderSeparator()}
                    <span className="app-footer-item">
                        <a className="underline" href={CONTACT_HREF}>
                            Contact Us
                        </a>
                    </span>
                </MuiThemeProvider>
            </div>
        );
    }

    private renderSeparator = () => {
        return <span className="app-footer-separator">&middot;</span>;
    };
}

function mapStateToProps(_state: IAppState, _ownProps: IAppFooterOwnProps): IAppFooterStateProps {
    return {};
}

function mapDispatchToProps(_dispatch: Dispatch, _ownProps: IAppFooterOwnProps): IAppFooterDispatchProps {
    return {};
}

export const AppFooter = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UnconnectedAppFooter);
