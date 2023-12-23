
function PongGame() {
    return (
        <div>
            <header id="header" className="clearfix">
                <div className="col align-self-center" style={{textAlign: "center", marginTop: "2.5%"}}>
                    <h1 className="custom-font header">
                        <img src="/img/palmera.png" alt="retro_palmtree" height="100" />
                        THE PONG
                        <img src="/img/palmera.png" alt="retro_palmtree" height="100" />
                    </h1>
                </div>
            </header>
            <div className="row">
                <div className="col-sm-12">
                    <div className="row" style={{ marginTop: '2.5%' }}>
                        <div className="col-sm-1 offset-sm-5">
                            <p className="custom-font">P1</p>
                        </div>
                        <div className="col-sm-1" style={{textAlign: "right"}}>
                            <p className="custom-font">P2</p>
                        </div>
                    </div>
                    <div className="row">
                        <div id="puntosDerecha" className="col-sm-6" style={{textAlign: "right"}}></div>
                        <div id="puntosIzquierda" className="col-sm-6"></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12" style={{ marginTop: '1%' }}>
                            <canvas id="myCanvas" width="720" height="480"></canvas>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                </div>
            </div>
        </div>
    )
}

export default PongGame