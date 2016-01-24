/*
 *  plugfest.js
 *
 *  David Janes
 *  IOTDB.org
 *  2016-01-23
 *
 *  Copyright [2013-2016] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either plugfest or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

var iotdb = require('iotdb');
var iotdb_transport = require('iotdb-transport');
var _ = iotdb.helpers;

var logger = bunyan.createLogger({
    name: 'homestar-plugfest',
    module: 'plugfest',
});

var PlugfestTransport = null;
try {
    PlugfestTransport = require('iotdb-transport-plugfest').Transport;
} catch {
}

var _transport_plugfest = function (iotdb_transporter) {
    if (!PlugfestTransport) {
        logger.error({
            method: "_transport_plugfest",
            cause: "do $ homestar install iotdb-transport-plugfest",
        }, "Transporter not installed");
        return;
    }

    var owner = iotdb.users.owner();
    var plugfest_transporter = new PlugfestTransport({
        prefix: url_join("/", "api", "things"),
        key_things: "thing",
    }, app);
    iotdb_transport.bind(iotdb_transporter, plugfest_transporter, {
        bands: [ "istate", "ostate", "model", ],
        updated: [ "ostate", ],
        user: owner,
    });
};

var on_ready = function(locals, profile) {
    _transport_plugfest(locals.things.make_iotdb_transport());
};

/**
 *  API
 */
exports.on_ready = on_ready;

