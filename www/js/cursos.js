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

    //document.getElementById('deviceready').classList.add('ready');
    $("#mostrarC").click(function() {
        console.log("El token es: "+localStorage.getItem("userToken"));
        $('#llista_principal').empty();

        $.ajax({
            method: "GET",
            url: "https://class-vr-room-api.herokuapp.com/api/get_courses",
            datatype: "json"
        }).done(function(courses) {
            let IdCursos = [];
            for (i in courses["course_list"]) {
                console.log(courses["course_list"][i]["title"]);
                console.log(courses["course_list"][i]["courseID"]);
                let newElement = $("<a id="+`${courses["course_list"][i]["courseID"]}`+" class='collection-item' href='#!'>"+courses["course_list"][i]["title"]+"</a>");
                IdCursos.push(courses["course_list"][i]["courseID"])
            newElement.click( function() {
                console.log(newElement);
                let CursoAMostrar = "";
                for (k in IdCursos) {
                    console.log(event.srcElement.id)
                    if(IdCursos[k] == event.srcElement.id) {
                        CursoAMostrar = IdCursos[k];
                    }

                }
                console.log(CursoAMostrar);

                $.ajax({
                    method: "GET",
                    //Para que las tascas funcionen bien se tendra que poner ya la URL pertinente al curso
                    url: "https://class-vr-room-api.herokuapp.com/api/get_course_details?id="+CursoAMostrar,
                    datatype: "json"
                }).done(function(details) {
                    //Creacion de objetos graficos
                    //Vaciando el div de la pagina 2
                    $('#test-swipe-2').empty();


                    let newVrtaskHeader = $("<h3>"+"VR TASKS"+"</h3>")
                    $('#test-swipe-2').append(newVrtaskHeader);

                    for (j in details["course"][0]["vr_tasks"]) {
                
                        let newvrtask = $("<p>"+details["course"][0]["vr_tasks"][j]["title"]+"</p>");
                        //let newimage = $("<img src='"+courses["course_list"][i]["title"]+"'></img>");
                        $('#test-swipe-2').append(newvrtask);

                    }

                    let newtaskHeader = $("<h3>"+"TASKS"+"</h3>")
                    $('#test-swipe-2').append(newtaskHeader);

                    for (j in details["course"][0]["tasks"]) {
                
                        let newtask = $("<p>"+details["course"][0]["tasks"][j]["title"]+"</p>");
                        $('#test-swipe-2').append(newtask);

                    }

                     //Agregando objetos graficos a la pagina 2
                    //$('#test-swipe-2').append(newimage);
                    //Saltamos a la pagina 2
                    $('.tabs').tabs("select", "test-swipe-2");
                    })
                });

            //$('#llista_principal').append(newVrHeader);
            $('#llista_principal').append(newElement);
            }
            //localStorage.setItem("IdCurso",courses["course_list"][i]["courseID"]);
            //localStorage.setItem("IdCurso",IdCursos);
        });

    })
};