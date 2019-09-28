window.addEventListener('camera-init', (data) => {
});

window.addEventListener('camera-error', (error) => {
});

//simple event bridge to connect AFrame Events and main controller
(function(w) {

    w.STEMEventBridge = {
        onMarkerFound: function () { },
        markerFound: function (markerId) {
            this.onMarkerFound(markerId);
        }
    };

}(window));

AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;

        marker.addEventListener('markerFound', function() {
            var markerId = marker.id;
            window.STEMEventBridge.markerFound(markerId);
        });

        marker.addEventListener('markerLost', function() {
            //nothing to do here
        });
    }
});

(function(w) {
    w.STEMStorage = {
        storeObject: function (o) {
            w.localStorage.setItem("stemfest_storage", JSON.stringify(o));
        },
        getStoredObject: function () {
            var result = JSON.parse(w.localStorage.getItem("stemfest_storage") || "{ }");
            return result;
        }
    };
}(window));

//Main controller for slider
(function(w, d, storageManager, eventBridge) {

    var sar = function () {

        this._configuration = {
            panelButton: 'pin',
            slider: 'slide-layer'
        };

        this._isCollapsed = true;

        eventBridge.onMarkerFound = this._markerFound.bind(this);
    };

    sar.prototype._markerFound = function (markerId) {
        var data = storageManager.getStoredObject();
        data[markerId] = true;

        storageManager.storeObject(data);
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

}(window, document, STEMStorage, STEMEventBridge));

//Object creation once page is loaded
(function (w) {
    w.onload = function () {
        var stemFestAR = new w.StemFestAR();
        stemFestAR.init();
    }
}(window));