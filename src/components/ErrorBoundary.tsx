import React from "react";

interface Props { }

interface State {
    error: any
    errorInfo: any
}

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h2>予期しない例外が発生しました。</h2>
                    <h2>申し訳ありません。</h2>
                    <p>{this.state.error && this.state.error.toString()}</p>
                    <p>もう一度操作をしても、状況が変わらない場合はお問い合わせください。</p>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}
