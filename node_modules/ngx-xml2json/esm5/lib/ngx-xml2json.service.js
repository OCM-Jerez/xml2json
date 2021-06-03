/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var NgxXml2jsonService = /** @class */ (function () {
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    NgxXml2jsonService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxXml2jsonService.ngInjectableDef = i0.defineInjectable({ factory: function NgxXml2jsonService_Factory() { return new NgxXml2jsonService(); }, token: NgxXml2jsonService, providedIn: "root" });
    return NgxXml2jsonService;
}());
export { NgxXml2jsonService };
function NgxXml2jsonService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxXml2jsonService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxXml2jsonService.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXhtbDJqc29uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gteG1sMmpzb24vIiwic291cmNlcyI6WyJsaWIvbmd4LXhtbDJqc29uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztJQU96QztLQUFpQjs7Ozs7SUFFakIsc0NBQVM7Ozs7SUFBVCxVQUFVLEdBQUc7UUFFWCxxQkFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDbEQscUJBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7aUJBQzlEO2FBQ0Y7U0FDRjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7U0FDckI7UUFFRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0YsR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ25DO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsR0FBRyxDQUFDLENBQUMscUJBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNsRCxxQkFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLHFCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUMvQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3RDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFDaEQscUJBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDMUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDbkIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDekI7b0JBQ0QsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzFDO2FBQ0Y7U0FDRjtRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDWjs7Z0JBMUNGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7OzZCQUpEOztTQUthLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4WG1sMmpzb25TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHhtbFRvSnNvbih4bWwpIHtcblxuICAgIGxldCBvYmogPSB7fTtcblxuICAgIGlmICh4bWwubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIGlmICh4bWwuYXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG9ialsnQGF0dHJpYnV0ZXMnXSA9IHt9O1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHhtbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgY29uc3QgYXR0cmlidXRlID0geG1sLmF0dHJpYnV0ZXMuaXRlbShqKTtcbiAgICAgICAgICBvYmpbJ0BhdHRyaWJ1dGVzJ11bYXR0cmlidXRlLm5vZGVOYW1lXSA9IGF0dHJpYnV0ZS5ub2RlVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHhtbC5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgb2JqID0geG1sLm5vZGVWYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoeG1sLmhhc0NoaWxkTm9kZXMoKSAmJiB4bWwuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiYgeG1sLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgIG9iaiA9IHhtbC5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZTtcbiAgICB9IGVsc2UgaWYgKHhtbC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeG1sLmNoaWxkTm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHhtbC5jaGlsZE5vZGVzLml0ZW0oaSk7XG4gICAgICAgIGNvbnN0IG5vZGVOYW1lID0gaXRlbS5ub2RlTmFtZTtcbiAgICAgICAgaWYgKHR5cGVvZiAob2JqW25vZGVOYW1lXSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgb2JqW25vZGVOYW1lXSA9IHRoaXMueG1sVG9Kc29uKGl0ZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0eXBlb2YgKG9ialtub2RlTmFtZV0ucHVzaCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjb25zdCBvbGQgPSBvYmpbbm9kZU5hbWVdO1xuICAgICAgICAgICAgb2JqW25vZGVOYW1lXSA9IFtdO1xuICAgICAgICAgICAgb2JqW25vZGVOYW1lXS5wdXNoKG9sZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9ialtub2RlTmFtZV0ucHVzaCh0aGlzLnhtbFRvSnNvbihpdGVtKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG59XG4iXX0=