// import getTime from "@/utilities/getTime";
import {Document, Page, View, Text, PDFDownloadLink, StyleSheet} from "@react-pdf/renderer";
import {useEffect, useState} from "react";

const styles = StyleSheet.create({
   table: {
      display: "flex",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0
   },
   tableRow: {
      margin: "auto",
      flexDirection: "row"
   },
   tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 0.5,
      borderLeftWidth: 0.5,
      borderTopWidth: 0
   },
   tableCell: {
      margin: "auto",
      marginTop: 7,
      marginBottom: 7,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: 13
   }
});

const MyDoc = ({shifts, days, exams}: any) => (
   <Document>
      <Page size="A4" orientation="landscape">
         <View
            style={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "space-between",
               alignItems: "center",
               margin: 7
            }}>
            <Text style={{fontSize: 12}}>Daffodil International University</Text>
            <Text style={{fontSize: 12}}>
               Department of Computer Science and Engineering (Day and Evening Program)
            </Text>
            <Text style={{fontSize: 12}}>Final Examination Routine, Fall 2023</Text>
         </View>
         <View style={styles.table}>
            <View style={styles.tableRow}>
               <View style={styles.tableCol}></View>
               {shifts.map((shift: any, index: number) => (
                  <View style={styles.tableCol} key={index}>
                     <Text style={styles.tableCell}>
                        {shift.start} - {shift.end}
                     </Text>
                  </View>
               ))}
            </View>

            {days.map((day: any, i: any) => (
               <View style={styles.tableRow} key={i}>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>{days[i]}</Text>
                  </View>

                  {shifts.map((shift: any, j: number) => (
                     <View style={styles.tableCol} key={j}>
                        {exams[i + "" + j].map((exam: any, i: number) => {
                           return (
                              <Text style={styles.tableCell} key={j}>
                                 {exam.semester} : {exam.code} - {exam.title}
                              </Text>
                           );
                        })}
                     </View>
                  ))}
               </View>
            ))}
         </View>
      </Page>
   </Document>
);

export default function PDF({shifts, days, exams}: any) {
   const [pdfBtn, setPdfBtn] = useState<JSX.Element>(<></>);
   console.log(days);

   useEffect(() => {
      setPdfBtn(
         <PDFDownloadLink
            document={<MyDoc shifts={shifts} days={days} exams={exams} />}
            fileName="Routine.pdf">
            {() => <button>Download PDF</button>}
         </PDFDownloadLink>
      );
   }, [days, exams, shifts]);

   return <>{pdfBtn}</>;
}
