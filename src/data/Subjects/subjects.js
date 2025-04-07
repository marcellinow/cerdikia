import modules from "../Modul/modules"; // Import modules data
import PPKNImage from "../../assets/Img/PPKN.svg"; // Import image for subjectId: 1
import INDOImage from "../../assets/Img/BINDO.svg"; // Import image for subjectId: 2
import MTKImage from "../../assets/Img/MTK.svg"; // Import image for subjectId: 3
import SENBUDImage from "../../assets/Img/SENBUD.svg"; // Import image for subjectId: 4
import ENGImage from "../../assets/Img/BING.svg"; // Import image for subjectId: 5
import PJOKImage from "../../assets/Img/PJOK.svg"; // Import image for subjectId: 6

const subjects = [
  {
    subjectId: 1,
    subjectName: "Pendidikan Pancasila dan Kewarganegaraan",
    subjectImage: PPKNImage, // Use imported image
    classId: 1,
    moduleIds: modules
      .filter(
        (module) =>
          module.subjectName === "Pendidikan Pancasila dan Kewarganegaraan" &&
          module.gradeLevel === 1
      )
      .map((module) => module.moduleId),
    moduleCount: modules.filter(
      (module) =>
        module.subjectName === "Pendidikan Pancasila dan Kewarganegaraan" &&
        module.gradeLevel === 1
    ).length,
    subjectPath: "/kelas/1/pkn", // Path for PPKN
  },
  {
    subjectId: 2,
    subjectName: "Bahasa Indonesia",
    subjectImage: INDOImage, // Use imported image
    classId: 1,
    moduleIds: modules
      .filter(
        (module) =>
          module.subjectName === "Pendidikan Pancasila dan Kewarganegaraan" &&
          module.gradeLevel === 1
      )
      .map((module) => module.moduleId), // Same moduleIds as PPKN
    moduleCount: modules.filter(
      (module) =>
        module.subjectName === "Pendidikan Pancasila dan Kewarganegaraan" &&
        module.gradeLevel === 1
    ).length,
    subjectPath: "/kelas/1/indo", // Path for Bahasa Indonesia
  },
  {
    subjectId: 3,
    subjectName: "Matematika",
    subjectImage: MTKImage, // Use imported image
    classId: 1,
    moduleIds: modules
      .filter(
        (module) =>
          module.subjectName === "Pendidikan Pancasila dan Kewarganegaraan" &&
          module.gradeLevel === 1
      )
      .map((module) => module.moduleId), // Same moduleIds as PPKN
    moduleCount: modules.filter(
      (module) =>
        module.subjectName === "Pendidikan Pancasila dan Kewarganegaraan" &&
        module.gradeLevel === 1
    ).length,
    subjectPath: "/kelas/1/pkn", // Redirect to PPKN
  },
  {
    subjectId: 4,
    subjectName: "Seni Budaya",
    subjectImage: SENBUDImage, // Use imported image
    classId: 1,
    moduleIds: modules
      .filter(
        (module) =>
          module.subjectName === "Pendidikan Pancasila dan Kewarganegaraan" &&
          module.gradeLevel === 1
      )
      .map((module) => module.moduleId), // Same moduleIds as PPKN
    moduleCount: modules.filter(
      (module) =>
        module.subjectName === "Pendidikan Pancasila dan Kewarganegaraan" &&
        module.gradeLevel === 1
    ).length,
    subjectPath: "/kelas/1/pkn", // Redirect to PPKN
  },
  {
    subjectId: 5,
    subjectName: "Bahasa Inggris",
    subjectImage: ENGImage, // Use imported image
    classId: 1,
    moduleIds: modules
      .filter(
        (module) =>
          module.subjectName === "Pendidikan Pancasila dan Kewarganegaraan" &&
          module.gradeLevel === 1
      )
      .map((module) => module.moduleId), // Same moduleIds as PPKN
    moduleCount: modules.filter(
      (module) =>
        module.subjectName === "Pendidikan Pancasila dan Kewarganegaraan" &&
        module.gradeLevel === 1
    ).length,
    subjectPath: "/kelas/1/pkn", // Redirect to PPKN
  },
  {
    subjectId: 6,
    subjectName: "PJOK",
    subjectImage: PJOKImage, // Use imported image
    classId: 1,
    moduleIds: modules
      .filter(
        (module) =>
          module.subjectName === "Pendidikan Pancasila dan Kewarganegaraan" &&
          module.gradeLevel === 1
      )
      .map((module) => module.moduleId), // Same moduleIds as PPKN
    moduleCount: modules.filter(
      (module) =>
        module.subjectName === "Pendidikan Pancasila dan Kewarganegaraan" &&
        module.gradeLevel === 1
    ).length,
    subjectPath: "/kelas/1/pkn", // Redirect to PPKN
  },
];

export default subjects;
