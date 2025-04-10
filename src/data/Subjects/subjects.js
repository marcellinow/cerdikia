import modules from "../Modul/modules"; // Import modules data
import PPKNImage from "/images/PPKN.svg";
import INDOImage from "/images/BINDO.svg";
import MTKImage from "/images/MTK.svg";
import SENBUDImage from "/images/SENBUD.svg";
import ENGImage from "/images/BING.svg";
import PJOKImage from "/images/PJOK.svg";

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
