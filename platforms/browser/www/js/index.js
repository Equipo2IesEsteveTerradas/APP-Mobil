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
                window.location.assign('prueba.html');
            }
        }
        else{
            alert("Usuario o contrasena incorrectos")
            
        }    
    })
    (function($){
  $(function(){

      // on document ready...

      // init GUI
    $('.sidenav').sidenav();
      $('.fixed-action-btn').floatingActionButton();
      $('.tabs').tabs({"swipeable":true});


    $('#downloadbtn').click( function() {
        //alert("hola!");

        $('#llista_principal').empty();

        $.ajax({
          method: "GET",
          url: "https://api.spaceflightnewsapi.net/v3/articles?_limit=5",
          dataType: "json",
        }).done(function (data) {

          for(let item in data) {
            console.log(data[item]["title"]);
            // aquí caldría fer mes coses, of course...
            // ...
            let newElement = $("<a id='listelement' class='collection-item' href='#!'>"+data[item]["title"]+"</a>");
            
            newElement.click( function() {
              //Creacion de objetos graficos
              let newh1 = $("<h1>"+data[item]["title"]+"</h1>");
              let newsummary = $("<p>"+data[item]["summary"]+"</p>");
              let newimage = $("<img src='"+data[item]["imageUrl"]+"'></img>");
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
          };
        }).fail(function () {
          alert("ERROR");
        });

    });


  }); // end of document ready
})(jQuery); // end of jQuery name space


document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}
};
