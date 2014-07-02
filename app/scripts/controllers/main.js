BeetApp
    .controller('MainController', function($scope, $rootScope, $http, $location, $translate, Login) {
        $scope.formData = {};

        $rootScope.languages = new Array("pt_br", "en", "es");
        

        $scope.changeCompany = function(intIndex) {
            $rootScope.session.menus = $rootScope.session.companies[intIndex].menus;
            $rootScope.session.company = $rootScope.session.companies[intIndex];
            $("#modal-companies-close").trigger("click");
            $location.path('home'); 
        };

        $scope.changeMenu = function(menu) {
            $rootScope.session.menu = menu;
            $location.path(menu.url); 
        };

        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };



/*

		if ($location.path() != "/login"){
		    $(document).ready(function(){
		       $("#top-menu").show();
		       $("#sidebar").show();
		       $("#login-block").hide();
		    });		
		}




        Menu.get()
            .success(function(data) {
                $("#container-menu").show();
                $scope.menus = data;
            })
*/
    });




/*
        jQuery(document).ready(function () {
                $('html').addClass('sidebar-medium');
        });

*/
    var cSpeed=5;
    var cWidth=120;
    var cHeight=128;
    var cTotalFrames=29;
    var cFrameWidth=120;
    var cImageSrc='images/sprites.gif';
    
    var cImageTimeout=false;
    var cIndex=0;
    var cXpos=0;
    var cPreloaderTimeout=false;
    var SECONDS_BETWEEN_FRAMES=0;
    
    function startAnimation(){
        
        document.getElementById('loaderImage').style.backgroundImage='url('+cImageSrc+')';
        document.getElementById('loaderImage').style.width=cWidth+'px';
        document.getElementById('loaderImage').style.height=cHeight+'px';
        
        //FPS = Math.round(100/(maxSpeed+2-speed));
        FPS = Math.round(100/cSpeed);
        SECONDS_BETWEEN_FRAMES = 1 / FPS;
        
        cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES/1000);
        
    }
    
    function continueAnimation(){
        
        cXpos += cFrameWidth;
        //increase the index so we know which frame of our animation we are currently on
        cIndex += 1;
         
        //if our cIndex is higher than our total number of frames, we're at the end and should restart
        if (cIndex >= cTotalFrames) {
            cXpos =0;
            cIndex=0;
        }
        
        if(document.getElementById('loaderImage'))
            document.getElementById('loaderImage').style.backgroundPosition=(-cXpos)+'px 0';
        
        cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES*1000);
    }
    
    function stopAnimation(){//stops animation
        clearTimeout(cPreloaderTimeout);
        cPreloaderTimeout=false;
    }
    
    function imageLoader(s, fun)//Pre-loads the sprites image
    {
        clearTimeout(cImageTimeout);
        cImageTimeout=0;
        genImage = new Image();
        genImage.onload=function (){cImageTimeout=setTimeout(fun, 0)};
        genImage.onerror=new Function('alert(\'Could not load the image\')');
        genImage.src=s;
    }
    
    //The following code starts the animation
    new imageLoader(cImageSrc, 'startAnimation()');


    function createHtml(attribute, value){
        var html = "";
            if (attribute.group != undefined){


                var strName = attribute.group.description + "." + attribute.description;
                var attr = "ng-model='" +strName+ "' id='" +strName+ "'";

                if (attribute.size != null){
                    attr += "size='" +attribute.size+ "' ";
                }

                if (attribute.required){
                    attr += "required ";
                }

                switch (attribute.type.template){
                    case "TEXT":
                        html = "<input type='TEXT' "+attr+" value='"+value+"' class='form-control input-lg' />";
                        break;
                    case "TEXTAREA":
                        html = "<textarea "+attr+">"+value+"</textarea>";
                        break;
                    case "DROPDOWN":
                        html = "<select "+attr+">"

                        for (option in attribute.type.selection)
                        {
                            if (option != value) {
                                html += "<option value='" + option + "'>" + option + "</option>";
                            } else {
                                html += "<option value='" + option + "' selected>" + option + "</option>";
                            }
                        }
                        html += "</select>";
                        break;
                    case "RADIO":
                        html = "<select class='form-control' "+attr+"><option value=''>Selecione</option>"
                        arrSelection = attribute.type.selection;
                        for (x=0;x<arrSelection.length;x++)
                        {
                            if (arrSelection[x] != value) {
                                html += "<option value='" + arrSelection[x] + "'>" + arrSelection[x] + "</option>";
                            } else {
                                html += "<option value='" + arrSelection[x] + "' selected>" + arrSelection[x] + "</option>";
                            }
                        }
                        html += "</select>";
                        break;

                    case "DATE":
                        html = "<div class='input-append date' id='dpYears' data-date='12-02-2012' data-date-format='dd-mm-yyyy' data-date-viewmode='years'><input class='span2' size='16' type='text' "+attr+" value='"+value+"' readonly=''><span class='add-on'><i class='glyphicon glyphicon-calendar'></i></span></div>";
        $(function(){
            $('#dpYears').datepicker();
        });



                      
                        break;

                        
                        /*
                        arrSelection = attribute.type.selection;
                        html = "<div class='form-group'><div class='skin-section'>";

                        for (x=0;x<arrSelection.length;x++)
                        {
                            
                            if (arrSelection[x] != value) {
                                html += "";
                            } else {
                                html += "";
                            }

                            html += "<div class='ui-checkbox'><label class='ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-on'>"+arrSelection[x]+"</label><input type='checkbox' checked='' data-cacheval='false'></div>";
                        }
                        html += "</div></div>";


                        break;
                        */

                }
            }
            return html;
    }