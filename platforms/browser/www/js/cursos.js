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

    $('.sidenav').sidenav();
    $('.fixed-action-btn').floatingActionButton();
    $('.tabs').tabs({"swipeable":true});
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    $("#mostrarC").click(function() {
        console.log("Prueba");
        console.log("El token es: "+localStorage.getItem("userToken"));
        $('#llista_principal').empty();

        $.ajax({
            method: "GET",
            url: "https://class-vr-room-api.herokuapp.com/api/get_courses",
            datatype: "json"
        }).done(function(courses) {
            for (i in courses["course_list"]) {
                console.log(courses["course_list"][i]["title"]);



                let newElement = $("<a id='listelement' class='collection-item' href='#!'>"+courses["course_list"][i]["title"]+"</a>");
            
            newElement.click( function() {
              //Creacion de objetos graficos
              let newh1 = $("<h1>"+courses["course_list"][i]["title"]+"</h1>");
              let newsummary = $("<p>"+courses["course_list"][i]["title"]+"</p>");
              let newimage = $("<img src='"+courses["course_list"][i]["title"]+"'></img>");
              //Vaciando el div de la pagina 2
              $('#test-swipe-2').empty();
              //Agregando objetos graficos a la pagina 2
              $('#test-swipe-2').append(newh1);
              $('#test-swipe-2').append(newsummary);
              $('#test-swipe-2').append(newimage);
              //Saltamos a la pagina 2
              $('.tabs').tabs("select", "test-swipe-2");
            })

            $('#llista_principal').append(newElement);
            }
        });

    })
};