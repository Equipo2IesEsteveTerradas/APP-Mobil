/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log("Hola")
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
   // let users = {1{"Name" : pepe , password:  "123"}, {2{"Name": lola , password:"456"}};
      let users = {pepe : 123 , lola : 456}
    $("#loginbut").click(function() {
        console.log("Dins de la funcio");
        let userEl = document.getElementById("userL");
        let passEl = document.getElementById("passL");
        let urlEl = document.getElementById("urlL");

        if (users[userEl.value] == passEl.value) {
            if (urlEl.value != "https://class-vr-room-api.herokuapp.com") {
                alert("Could not acces correctly to the following route: "+urlEl.value)
            }
            else {
                alert("Logged succesfully as "+userEl.value);
            }
        }
        else{
            alert("Usuario o contrasena incorrectos")
            
        }    
    })
};
