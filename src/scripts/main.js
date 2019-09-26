window.addEventListener('camera-init', (data) => {
    console.log('camera-init', data);
})

window.addEventListener('camera-error', (error) => {
    console.log('camera-error', error);
})

AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;

        marker.addEventListener('markerFound', function() {
            var markerId = marker.id;
            console.log('markerFound', markerId);
        });

        marker.addEventListener('markerLost', function() {
            var markerId = marker.id;
            console.log('markerLost', markerId);
        });
    }
});

//Main controller for slider
(function(w, d) {

    var sar = function () {
        this._configuration = {
            panelButton: 'pin',
            slider: 'slide-layer'
        };

        this._isCollapsed = true;
    };

    sar.prototype.init = function () {
        var self = this;
        var pin = d.getElementsByClassName(this._configuration.panelButton)[0];
        var slider = d.getElementsByClassName(this._configuration.slider)[0];

        pin.addEventListener('click', function () {
            if (self._isCollapsed === true) {
                slider.style.left = '0px';
            } else {
                slider.style.left = '-250px';
            }

            self._isCollapsed = !self._isCollapsed;
        });
        
    };

    w.StemFestAR = sar;

}(window, document));

//Object creation once page is loaded
(function (w) {
    w.onload = function () {
        var stemFestAR = new w.StemFestAR();
        stemFestAR.init();
    }
}(window));