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

function idVrTasks(taskID) {
    return function(){
        $.ajax({
            headers: { "Authorization": "Token "+localStorage.getItem("userToken") },
        method: "GET",
        url: "https://ietivroom.herokuapp.com/api/pin_request",
        data: {"VRtaskID": taskID},
        datatype: "json"
        }).done(function(dades){
        
            console.log(dades);
            $("#pruebaPin").text(dades["PIN"]);
            $('#modal1').modal();
            $('#modal1').modal('open');
        }).fail(function() {
            console.log("Error");
        });
    }
}

function grades(CursoAMostrar,taskID) {
    return function(){
        $.ajax({
            headers: {"Authorization": "Token "+localStorage.getItem("userToken")},
            method: "GET",
            url: "https://ietivroom.herokuapp.com/api/get_course_details",
            data: {"VRtaskID": taskID},
            datatype: "json"
        }).done(function(details){

            //QUEDA REVIAR ESTA PARTE

            console.log(details)
            //Recorremos las diferentes VRTASKS
            for (i in details["course_list"]["elements"]["tasks"]) {
                //Comprobamos que la ID de la VrTask sea la que nos interesa
                if (details["course_list"]["elements"]["tasks"][i]["taskID"] == taskID) {
                    console.log(details["course_list"]["elements"]["tasks"][i]);
                    //Recorremos y omprobamos las diferentes completions que haya del usuario
                    for (j in details["course_list"]["elements"]["tasks"][i]["completions"]) {
                        //if (details["course"]["elements"]["tasks"][i]["completions"][j]["studentID"] == localStorage.getItem("UserID")) {
                            console.log(details["course_list"]["elements"]["tasks"][i]["completions"][j]["maxQualitication"])
                            //Se pueden crear diccionarios para almacenar las diferentes cantidades de Datos
                            //y luego que estos datos se vayan anadiendo mediante un for a una ul por cada completion
                            
                            //Se tiene que cambiar de sitio los dict
                            let failedIt = {};
                            let passedIt = {};
                        //}
                    }
                    $("#pruebaPin").text(details["course_list"]["elements"]["tasks"][i]);

                } 
            }
            $('#modal1').modal();
            $('#modal1').modal('open');
        }).fail(function() {
            console.log("Error");
        });
    }
}

function onDeviceReady() {

    $('.sidenav').sidenav();
    $('.fixed-action-btn').floatingActionButton();
    $('.tabs').tabs({"swipeable":true});
    //$('.scrollspy').scrollSpy();
    //$('select').formSelect();
    //console.log("Antes del pin request")
    /*$.ajax({
        headers: { "Authorization": "Token "+localStorage.getItem("userToken") },
        method: "GET",
        url: "https://ietivroom.herokuapp.com/api/pin_request",
        data: {"VRtaskID": "1"},
        datatype: "json"
    }).done(function(prueba) {
        console.log("Dentro de funcion");
        console.log(prueba);
    });*/
    //console.log("Despues pin request");

    //document.getElementById('deviceready').classList.add('ready');
    console.log("Nombre de usuario"+localStorage.getItem("username"))
    let newNombre = localStorage.getItem('username');
    console.log(newNombre);
    $('#userPrueba').text(newNombre);

    console.log("El token es: "+localStorage.getItem("userToken"));
    $('#llista_principal').empty();

    $.ajax({
        headers: { "Authorization": "Token "+localStorage.getItem("userToken") },
        method: "GET",
        url: "https://ietivroom.herokuapp.com/api/get_courses",
        datatype: "json"
    }).done(function(courses) {
        console.log(courses);
        let IdCursos = [];
        for (i in courses["course_list"]) {
            //console.log(courses["course_list"][i]["title"]);
            //console.log(courses["course_list"][i]["courseID"]);
            let newElement = $("<div id="+`${courses["course_list"][i]["courseID"]}`+" class='collection-item' href='#!'>"+courses["course_list"][i]["title"]+"</div>");
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

            $.ajax({
                headers: { "Authorization": "Token "+localStorage.getItem("userToken") },
                method: "GET",
                //Para que las tascas funcionen bien se tendra que poner ya la URL pertinente al curso
                url: "https://ietivroom.herokuapp.com/api/get_course_details",
                //url: "https://ietivroom.herokuapp.com/api/get_course_details?id="+CursoAMostrar,
                data: {courseID: CursoAMostrar},
                datatype: "json"
            }).done(function(details) {
                console.log(details);
                //Creacion de objetos graficos
                //Vaciando el div de la pagina 2
                $('#activities').empty();

                let newVrtaskHeader = $("<div class='actividad'>"+"VR TASKS"+"</div>")
                $('#activities').append(newVrtaskHeader);


                //Creo que el problema esta en la diferencia de los puntos
                for (j in details["course_list"]["elements"]["tasks"]) {
            
                    let newvrtask = $("<div class='actividad'><button class='actividad' href='#!'>"+details["course_list"]["elements"]["tasks"][j]["title"]+"</button></div>");
                    let idVr = details["course_list"]["elements"]["tasks"][j]["taskID"];
                    newvrtask.click(idVrTasks(idVr));
                    $('#activities').append(newvrtask);

                }

                /*let newtaskHeader = $("<div class='actividad'>"+"TASKS"+"</div>")
                $('#activities').append(newtaskHeader);

                for (j in details["course"][0]["tasks"]) {
            
                    let newtask = $("<div class='actividad'><button class='actividad' href='#!'>"+details["course"][0]["tasks"][j]["title"]+"</button></div>");
                    $('#activities').append(newtask);

                }*/

                    //Agregando objetos graficos a la pagina 2
                //Saltamos a la pagina 2
                $('.tabs').tabs("select", "test-swipe-2");
                })
            });

        $('#llista_principal').append(newElement);
        }


    }).fail(function(){
        console.log("Todo mal")
    });
};