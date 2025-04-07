import { db } from "./firebase"; // Import Firestore instance
import { collection, setDoc, doc } from "firebase/firestore";

const subjects = [
  {
    subjectId: 1,
    subjectName: "Pendidikan Pancasila dan Kewarganegaraan",
    subjectImage: "PPKN.svg",
    classId: 1,
    moduleIds: [
      "HvfqjEGeLfE36eigQK2n",
      "MtOmPYI4Ba414bOiQuSz",
      "X9wjBJOtU1JmraYVhcY0",
      "glgRgyjrTiYCRDim1P3r",
      "xGwvUbH0YFiw3uyWlCKt",
      "yheuuYCq4Ix9Ovnkm6JH",
    ],
    moduleCount: 5,
    subjectPath: "/kelas/1/pkn",
  },
  {
    subjectId: 2,
    subjectName: "Bahasa Indonesia",
    subjectImage: "BINDO.svg",
    classId: 1,
    moduleIds: [
      "HvfqjEGeLfE36eigQK2n",
      "MtOmPYI4Ba414bOiQuSz",
      "X9wjBJOtU1JmraYVhcY0",
      "glgRgyjrTiYCRDim1P3r",
      "xGwvUbH0YFiw3uyWlCKt",
      "yheuuYCq4Ix9Ovnkm6JH",
    ],
    moduleCount: 5,
    subjectPath: "/kelas/1/indo",
  },
  {
    subjectId: 3,
    subjectName: "Matematika",
    subjectImage: "MTK.svg",
    classId: 1,
    moduleIds: [
      "HvfqjEGeLfE36eigQK2n",
      "MtOmPYI4Ba414bOiQuSz",
      "X9wjBJOtU1JmraYVhcY0",
      "glgRgyjrTiYCRDim1P3r",
      "xGwvUbH0YFiw3uyWlCKt",
      "yheuuYCq4Ix9Ovnkm6JH",
    ],
    moduleCount: 5,
    subjectPath: "/kelas/1/pkn", // Redirect to PPKN
  },
  {
    subjectId: 4,
    subjectName: "Seni Budaya",
    subjectImage: "SENBUD.svg",
    classId: 1,
    moduleIds: [
      "HvfqjEGeLfE36eigQK2n",
      "MtOmPYI4Ba414bOiQuSz",
      "X9wjBJOtU1JmraYVhcY0",
      "glgRgyjrTiYCRDim1P3r",
      "xGwvUbH0YFiw3uyWlCKt",
      "yheuuYCq4Ix9Ovnkm6JH",
    ],
    moduleCount: 5,
    subjectPath: "/kelas/1/pkn", // Redirect to PPKN
  },
  {
    subjectId: 5,
    subjectName: "Bahasa Inggris",
    subjectImage: "BING.svg",
    classId: 1,
    moduleIds: [
      "HvfqjEGeLfE36eigQK2n",
      "MtOmPYI4Ba414bOiQuSz",
      "X9wjBJOtU1JmraYVhcY0",
      "glgRgyjrTiYCRDim1P3r",
      "xGwvUbH0YFiw3uyWlCKt",
      "yheuuYCq4Ix9Ovnkm6JH",
    ],
    moduleCount: 5,
    subjectPath: "/kelas/1/pkn", // Redirect to PPKN
  },
  {
    subjectId: 6,
    subjectName: "PJOK",
    subjectImage: "PJOK.svg",
    classId: 1,
    moduleIds: [
      "HvfqjEGeLfE36eigQK2n",
      "MtOmPYI4Ba414bOiQuSz",
      "X9wjBJOtU1JmraYVhcY0",
      "glgRgyjrTiYCRDim1P3r",
      "xGwvUbH0YFiw3uyWlCKt",
      "yheuuYCq4Ix9Ovnkm6JH",
    ],
    moduleCount: 5,
    subjectPath: "/kelas/1/pkn", // Redirect to PPKN
  },
];

async function seedData() {
  try {
    // Tambahkan data subjects ke Firestore
    for (const subject of subjects) {
      await setDoc(
        doc(collection(db, "subjects"), String(subject.subjectId)),
        subject
      );
    }

    console.log("Data subjects berhasil ditambahkan ke Firestore!");
  } catch (error) {
    console.error("Gagal menambahkan data subjects ke Firestore:", error);
  }
}

seedData();
