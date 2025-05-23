import * as Plotly from "plotly.js";
import * as React from "react";
import Plot from "react-plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";

/**
 * based on https://plot.ly/javascript/react/#quick-start
 */
export class SimpleChartComponent extends React.PureComponent<any> {
    render() {
        return (
            <Plot
                data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: "scatter",
                        marker: { color: "red" },
                    },
                    { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
                ]}
                layout={{ width: 320, height: 240, title: { text: "A Fancy Plot" } }}
            />
        );
    }
}

/**
 * based on https://github.com/plotly/react-plotly.js#state-management
 */
interface StateManagementChartComponentState {
    data: Plotly.Data[];
    layout: Partial<Plotly.Layout>;
    frames: Plotly.Frame[] | null;
}

class StateManagementChartComponent extends React.Component<{}, StateManagementChartComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = { data: [], layout: {}, frames: [] };
    }

    render() {
        return (
            <Plot
                data={this.state.data}
                layout={this.state.layout}
                frames={this.state.frames || undefined}
                onInitialized={figure => this.setState(figure)}
                onUpdate={figure => this.setState(figure)}
            />
        );
    }
}

/**
 * This creates a minified Plotly Plot, if a minified version is
 * supplied to createPlotlyComponent for example plotly.js-basic-dist
 */
const MinPlot = createPlotlyComponent(Plotly);

export class MinChartComponent extends React.PureComponent<any> {
    render() {
        return (
            <MinPlot
                data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: "scatter",
                        marker: { color: "red" },
                    },
                    { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
                ]}
                layout={{ width: 320, height: 240, title: { text: "A Fancy Plot" } }}
            />
        );
    }
}

export const HoverPlot = () => {
    return (
        <Plot
            data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: "scatter",
                },
            ]}
            layout={{ width: 320, height: 240, title: { text: "A Fancy Plot" } }}
            onHover={e => console.log(e)}
            onBeforeHover={e => Boolean(e.points[0].x === 1)}
        />
    );
};

export const WebGLPlot = () => {
    return (
        <Plot
            data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: "scattergl",
                },
            ]}
            layout={{ width: 320, height: 240, title: { text: "A Fancy Plot" } }}
            onHover={e => console.log(e)}
            onWebGlContextLost={() => console.log("WebGL context lost")}
        />
    );
};
