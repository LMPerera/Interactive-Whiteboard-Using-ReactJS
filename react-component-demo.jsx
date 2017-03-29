const { LiterallyCanvasReactComponent } = window.LC;

const DemoApp = React.createClass({
    getInitialState() {

        return {
            isSetUp: true,
            svgText: "",
            lcOptions: {
                backgroundImage: null,
                toolbarPosition: 'top',
                snapshot: JSON.parse(localStorage.getItem('drawing')),
                onInit: this.onInit,
                imageURLPrefix: "lib/img"
            }
        };
    },

    onInit: function(lc) {
        this.lc = lc;
        lc.on('drawingChange', this.save);
        lc.on('pan', this.save);
        lc.on('zoom', this.save);
        this.save();
        //setInterval(this.getVectors(),1000);
    },

    save() {
        localStorage.setItem('drawing', JSON.stringify(this.lc.getSnapshot()));
        this.setState({svgText: this.lc.getSVGString()});
    },

    getVectors() {
        localStorage.setItem('vectors', JSON.stringify(this.lc.getSnapshot()));
        this.setState({svgText: this.lc.getSVGString()});
    },

    actionOpenImage() {
      window.open(this.lc.getImage({
        // rect: {x: 0, y: 0, width: 100, height: 100}
        scale: 1, margin: {top: 10, right: 10, bottom: 10, left: 10}
      }).toDataURL());
    },

    actionChangeSize() {
        this.lc.setImageSize(null, 200)
    },

    actionSetUp() {
        this.setState({isSetUp: true});
    },

    actionTearDown() {
        this.setState({isSetUp: false});
    },

    render() {
      console.log('bum bum');
        return (<div>
            {this.state.isSetUp && <LiterallyCanvasReactComponent {...this.state.lcOptions} />}
        </div>);
    }
});


ReactDOM.render(
  <DemoApp />,
  document.getElementById('app-container')
);
