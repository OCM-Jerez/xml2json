(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-xml2json', ['exports', '@angular/core'], factory) :
    (factory((global['ngx-xml2json'] = {}),global.ng.core));
}(this, (function (exports,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxXml2jsonService = (function () {
        function NgxXml2jsonService() {
        }
        /**
         * @param {?} xml
         * @return {?}
         */
        NgxXml2jsonService.prototype.xmlToJson = /**
         * @param {?} xml
         * @return {?}
         */
            function (xml) {
                var /** @type {?} */ obj = {};
                if (xml.nodeType === 1) {
                    if (xml.attributes.length > 0) {
                        obj['@attributes'] = {};
                        for (var /** @type {?} */ j = 0; j < xml.attributes.length; j += 1) {
                            var /** @type {?} */ attribute = xml.attributes.item(j);
                            obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
                        }
                    }
                }
                else if (xml.nodeType === 3) {
                    obj = xml.nodeValue;
                }
                if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
                    obj = xml.childNodes[0].nodeValue;
                }
                else if (xml.hasChildNodes()) {
                    for (var /** @type {?} */ i = 0; i < xml.childNodes.length; i += 1) {
                        var /** @type {?} */ item = xml.childNodes.item(i);
                        var /** @type {?} */ nodeName = item.nodeName;
                        if (typeof (obj[nodeName]) === 'undefined') {
                            obj[nodeName] = this.xmlToJson(item);
                        }
                        else {
                            if (typeof (obj[nodeName].push) === 'undefined') {
                                var /** @type {?} */ old = obj[nodeName];
                                obj[nodeName] = [];
                                obj[nodeName].push(old);
                            }
                            obj[nodeName].push(this.xmlToJson(item));
                        }
                    }
                }
                return obj;
            };
        NgxXml2jsonService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        NgxXml2jsonService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxXml2jsonService.ngInjectableDef = i0.defineInjectable({ factory: function NgxXml2jsonService_Factory() { return new NgxXml2jsonService(); }, token: NgxXml2jsonService, providedIn: "root" });
        return NgxXml2jsonService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxXml2jsonComponent = (function () {
        function NgxXml2jsonComponent() {
        }
        /**
         * @return {?}
         */
        NgxXml2jsonComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        NgxXml2jsonComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'lib-ngx-xml2json',
                        template: "\n    <p>\n      Ngx-xml2json\n    </p>\n  ",
                        styles: []
                    },] },
        ];
        /** @nocollapse */
        NgxXml2jsonComponent.ctorParameters = function () { return []; };
        return NgxXml2jsonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxXml2jsonModule = (function () {
        function NgxXml2jsonModule() {
        }
        NgxXml2jsonModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [NgxXml2jsonComponent],
                        exports: [NgxXml2jsonComponent]
                    },] },
        ];
        return NgxXml2jsonModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NgxXml2jsonService = NgxXml2jsonService;
    exports.NgxXml2jsonComponent = NgxXml2jsonComponent;
    exports.NgxXml2jsonModule = NgxXml2jsonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXhtbDJqc29uLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXhtbDJqc29uL2xpYi9uZ3gteG1sMmpzb24uc2VydmljZS50cyIsIm5nOi8vbmd4LXhtbDJqc29uL2xpYi9uZ3gteG1sMmpzb24uY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gteG1sMmpzb24vbGliL25neC14bWwyanNvbi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hYbWwyanNvblNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgeG1sVG9Kc29uKHhtbCkge1xuXG4gICAgbGV0IG9iaiA9IHt9O1xuXG4gICAgaWYgKHhtbC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgaWYgKHhtbC5hdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgb2JqWydAYXR0cmlidXRlcyddID0ge307XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgeG1sLmF0dHJpYnV0ZXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSB4bWwuYXR0cmlidXRlcy5pdGVtKGopO1xuICAgICAgICAgIG9ialsnQGF0dHJpYnV0ZXMnXVthdHRyaWJ1dGUubm9kZU5hbWVdID0gYXR0cmlidXRlLm5vZGVWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoeG1sLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICBvYmogPSB4bWwubm9kZVZhbHVlO1xuICAgIH1cblxuICAgIGlmICh4bWwuaGFzQ2hpbGROb2RlcygpICYmIHhtbC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSAmJiB4bWwuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgb2JqID0geG1sLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlO1xuICAgIH0gZWxzZSBpZiAoeG1sLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB4bWwuY2hpbGROb2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0geG1sLmNoaWxkTm9kZXMuaXRlbShpKTtcbiAgICAgICAgY29uc3Qgbm9kZU5hbWUgPSBpdGVtLm5vZGVOYW1lO1xuICAgICAgICBpZiAodHlwZW9mIChvYmpbbm9kZU5hbWVdKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBvYmpbbm9kZU5hbWVdID0gdGhpcy54bWxUb0pzb24oaXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiAob2JqW25vZGVOYW1lXS5wdXNoKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZCA9IG9ialtub2RlTmFtZV07XG4gICAgICAgICAgICBvYmpbbm9kZU5hbWVdID0gW107XG4gICAgICAgICAgICBvYmpbbm9kZU5hbWVdLnB1c2gob2xkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb2JqW25vZGVOYW1lXS5wdXNoKHRoaXMueG1sVG9Kc29uKGl0ZW0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZ3gteG1sMmpzb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgTmd4LXhtbDJqc29uXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5neFhtbDJqc29uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge31cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFhtbDJqc29uQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gteG1sMmpzb24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ3hYbWwyanNvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtOZ3hYbWwyanNvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4WG1sMmpzb25Nb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkNvbXBvbmVudCIsIk5nTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7Ozs7UUFFakIsc0NBQVM7Ozs7WUFBVCxVQUFVLEdBQUc7Z0JBRVgscUJBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFFYixJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO29CQUN0QixJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDN0IsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDeEIsS0FBSyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUNqRCxxQkFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQzt5QkFDOUQ7cUJBQ0Y7aUJBQ0Y7cUJBQU0sSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtvQkFDN0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7aUJBQ3JCO2dCQUVELElBQUksR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7b0JBQzFGLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDbkM7cUJBQU0sSUFBSSxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUU7b0JBQzlCLEtBQUsscUJBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDakQscUJBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQyxxQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzt3QkFDL0IsSUFBSSxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTs0QkFDMUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ3RDOzZCQUFNOzRCQUNMLElBQUksUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxFQUFFO2dDQUMvQyxxQkFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUMxQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dDQUNuQixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzZCQUN6Qjs0QkFDRCxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt5QkFDMUM7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsT0FBTyxHQUFHLENBQUM7YUFDWjs7b0JBMUNGQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7OztpQ0FKRDs7Ozs7OztBQ0FBO1FBYUU7U0FBaUI7Ozs7UUFFakIsdUNBQVE7OztZQUFSLGVBQWE7O29CQWJkQyxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjt3QkFDNUIsUUFBUSxFQUFFLDZDQUlUO3dCQUNELE1BQU0sRUFBRSxFQUFFO3FCQUNYOzs7O21DQVZEOzs7Ozs7O0FDQUE7Ozs7b0JBR0NDLFdBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUUsRUFDUjt3QkFDRCxZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDcEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7cUJBQ2hDOztnQ0FSRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==