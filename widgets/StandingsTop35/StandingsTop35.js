'use strict';
/**
 * This widget displays the official standings of the top 35 cars in a larger view so more data can be displayed than the Standings widget. 
 * These usually only change as you cross the start/finish line.
 * The cars are color coded as Red(At least a lap ahead), Blue (At least a lap behind), White (Same lap as you), Cyan (Off track).
 * In the header the Strength of Field (SOF) and current lap for the leader are displayed.
 * 
 * Column values displayed are: Position, Number, Name, Club, Blk(Blink Counter), Rating, Lap, Pit/Run(Pit Time/Laps since pitting), Behind Leader, Best, Last times.
 * 
 * Red box around the name indicates below minimum speed. 
 * Green box around Best is fastest lap overall and Last is fastest last lap if you are within 2 laps of the leader.
 * <p>
 * Example:
 * <p><b>
 * &lt;sra-standings-top-35&gt;&lt;/sra-standings-top-35&gt;<br />
 * </b>
 * <img src="../widgets/StandingsTop35/icon.png" />
 * @ngdoc directive
 * @name sra-standings-top-35
 * @param {integer} data-sra-args-interval The interval, in milliseconds, that this widget will update from the server. Default is 1000.
 * @author Jeffrey Gilliam
 * @since 1.0
 * @copyright Copyright (C) 2015 - 2019 Jeffrey Gilliam
 * @license Apache License 2.0
 */
define(['SIMRacingApps','css!widgets/StandingsTop35/StandingsTop35','widgets/CarNumber/CarNumber'],
function(SIMRacingApps) {

    var self = {
        name:            'sraStandingsTop35',
        url:             'StandingsTop35',
        template:        'StandingsTop35.html',
        defaultWidth:    800,
        defaultHeight:   865,
        defaultInterval: 300, //initialize with the default interval
        module:          angular.module('SIMRacingApps') //get the main module
    };

    self.module.directive(self.name,
           ['sraDispatcher',
    function(sraDispatcher) {
        return {
            restrict: 'EA',
            scope: true,
            templateUrl: sraDispatcher.getWidgetUrl(self.url) + '/' + self.template,
            controller: ['$scope', function($scope) {
                $scope.directiveName   = self.name;
                $scope.defaultWidth    = self.defaultWidth;
                $scope.defaultHeight   = self.defaultHeight;
                $scope.defaultInterval = self.defaultInterval;

                $scope.positions = ['P1','P2','P3','P4','P5','P6','P7','P8','P9','P10','P11','P12','P13','P14','P15','P16','P17','P18','P19','P20','P21','P22','P23','P24','P25','P26','P27','P28','P29','P30','P31','P32','P33','P34','P35'];
                //load translations
                sraDispatcher.loadTranslations(sraDispatcher.getWidgetUrl(self.url),'text',function(path) {
                    $scope.translations = sraDispatcher.getTranslation(path);
                });
            }]
            , link: function($scope,$element,$attrs) {
                $attrs.sraArgsData = $attrs.sraArgsData || ""; 
                $attrs.sraArgsData += ";Car/REFERENCE/Position";
                $scope.names = sraDispatcher.subscribe($scope,$attrs,self.defaultInterval); //register subscriptions and options to the dispatcher
                //if the reference car is out of view, put them at the bottom
                $scope.$watch("data.Car.REFERENCE.Position.Value", function(value) {
                    if (value)
                        $scope.positions[34] = (value > 35 ? 'REFERENCE' : 'P35');
                });
                
            }
        };
    }]);

    return self;
});
