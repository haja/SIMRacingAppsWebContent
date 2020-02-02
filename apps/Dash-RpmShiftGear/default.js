'use strict';
/**
 * @author Jeffrey Gilliam
 * @since 1.0
 * @copyright Copyright (C) 2015 - 2019 Jeffrey Gilliam
 * @license Apache License 2.0
 */
require(SIMRacingAppsRequireConfig,
        ['angular'
        ,'SIMRacingApps'
        ,'css!default'
        ,'widgets/BarGauge/Tachometer/Tachometer'
        ,'widgets/Gear/Gear'
        ,'widgets/ShiftLight/ShiftLight'
        ,'widgets/ShiftLights/ShiftLights'
        ],
function( angular,  SIMRacingApps) {
    angular.element(document).ready(function() {

        //create any angular filters, values, constants, directives here on the SIMRacingApps.module

        //your application controller is added as a controller on the SIMRacingApps module
        SIMRacingApps.module.controller("SIMRacingApps-Controller",
               ['$scope','sraDispatcher',
        function($scope,  sraDispatcher) {
               sraDispatcher.loadTranslations("/SIMRacingApps/apps/Dash-RpmShiftGear","text",function(path) {
                   $scope.translations = sraDispatcher.getTranslation(path,"auto");
               });
               $scope.fullscreen = function() {
                   console.log("req fullscreen");
                   angular.element("#SIMRacingApps-App").requestFullscreen();
               };
        }]);

        //now start the process by passing in the element where the SIMRacingsApps class is defined.
        //all elements below that will be owned by SIMRacingApps. This should allow you to put other
        //content outside of this element that is not SIMRacingApps specific. All bundled apps will pass in the body.

        SIMRacingApps.start(angular.element(document.body),1280,768,16);

        //once angular is booted, your controller will get called.
        //it is not recommended to have multiple controllers in SIMRacingApps because of how the $scope is transversed from child to parent.
        //You can have as many directives and other angular objects as you wish.
    });
});
