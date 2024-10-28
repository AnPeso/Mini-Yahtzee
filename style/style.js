// import { StyleSheet } from 'react-native';
// import Metrics from './Metrics';

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: Metrics.scale(8),
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   containerScroll: {
//     flex: 1,
//     padding: Metrics.scale(0),
//     backgroundColor: '#f0f0f0', 
//     alignItems: 'center',
//   },
//   containerText: {
//     flex: 1,
//     padding: Metrics.scale(0),
//     alignItems: 'center',
//     width: '85%',
//   },
//   title: {
//     fontSize: Metrics.moderateScale(24),
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: Metrics.verticalScale(10),
//     textAlign: 'center',
//   },
//   diceContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: Metrics.verticalScale(5),
//     width: '80%',
//   },
//   text: {
//     fontSize: Metrics.moderateScale(14),
//     marginVertical: Metrics.verticalScale(5),
//     color: '#666',
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#59808a',
//     padding: Metrics.verticalScale(11),
//     borderRadius: Metrics.scale(10),
//     marginVertical: Metrics.verticalScale(10),
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonClear: {
//     backgroundColor: '#59808a',
//     padding: 7,
//     borderRadius: 10,
//     marginVertical: 12,
//     alignItems: 'center',
//     marginBottom: 70,
//   },
//   startButton: {
//     backgroundColor: '#59808a',
//     padding: Metrics.verticalScale(11),
//     borderRadius: Metrics.scale(10),
//     marginVertical: Metrics.verticalScale(10),
//     width: '70%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 15,
//     fontWeight: 'bold',
//   },
//   startButtonText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   totalText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     color: '#59808a', // Vihreä väri pistetilanteelle
//     textAlign: 'center',
//   },
//   bonusText: {
//     fontSize: 16,
//     color: '#cf6283', // Oranssi bonusteksti
//     textAlign: 'center',
//   },
//   textPoints: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginVertical: 5,
//     color: '#666',
//     textAlign: 'center',
//   },

//   pointsContainer: {
//     marginTop: 20,
//     width: '80%',
//     alignItems: 'center',
//   },
//   numberRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     width: '100%',
//   },
//   scoreRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   circle: {
//     width: 30,
//     height: 30,
//     borderRadius: 20,
//     backgroundColor: '#d3d3d3',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   circleText: {
//     fontSize: 18,
//     color: '#000',
//   },
//   pointBox: {
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   pointText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   playerText: {
//     fontSize: 18,
//     color: '#87cfc9',
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   finalPointsText: {
//     fontSize: 15,
//     color: '#59808a',
//     textAlign: 'center',
//     marginTop: 2,
//   },
//   finalPointsTotalText: {
//     fontSize: 20,
//     color: '#59808a',
//     textAlign: 'center',
//     marginTop: 2,
//     fontWeight: 'bold',
//   },
//   header: {
//     height: 70,
//     backgroundColor: '#87cfc9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%', 
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   footer: {
//     height: 40,
//     backgroundColor: '#87cfc9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   footerText: {
//     fontSize: 12,
//     color: '#000',
//   },
//   pointsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "80%",
//     marginBottom: 20,
//   },
//   pointsColumn: {
//     alignItems: "center",
//   },
//   circleButton: {
//     backgroundColor: "#6c757d", // harmaa taustaväri
//     borderRadius: 50,
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 5,
//   },
//   circleButtonText: {
//     color: "white",
//     fontSize: 18,
//   },
//   scoreItem: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     paddingVertical: 10,
//     width: '100%',
//   },
// });
//style.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  }
});