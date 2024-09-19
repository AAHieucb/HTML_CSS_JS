// Export import

// File export phải là strict mode, chả cần bật cx tự động. File có import phải có type module. File type module
// cx tự bật strictmode -> k dùng đc document.write nhưng vẫn console.log đc
import nameOfImportFunc from "./module.js";
import { nameOfExportVar as nameOfImportVar } from "./module.js";
import * as Set from "./module3.js";

nameOfImportFunc(nameOfImportVar);
nameOfImportFunc(Set.ageExport);
nameOfImportFunc(Set.nameExport);
