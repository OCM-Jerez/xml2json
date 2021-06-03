ngx-xml2json
============

Angular Library to convert XML data to JSON. 

Tested on Angular 6.

Install
=======

```
npm install ngx-xml2json --save
```


Usage Example:
==============

```
import { Component } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  xml = `<note><to>User</to><from>Library</from><heading>Message</heading><body>Some XML to convert to JSON!</body></note>`;
  constructor(private ngxXml2jsonService: NgxXml2jsonService) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(this.xml, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    console.log(obj);

  }

}
```

## Author

Steven Fernandez



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


Changelog
=========

## [1.0.0] - 2018-05-12
### Added
- First Commit - xml2json conversion

## [1.0.1] - 2018-05-12
### Added
- Code and readme tidy

## [1.0.2] - 2018-05-12
### Added
- Updated package.json

