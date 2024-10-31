import { StyleSheet } from 'react-native';
import Metrics from './Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  pointRow: {
    justifyContent: 'space-around',
    margin: Metrics.verticalScale(6),
    padding: Metrics.verticalScale(2)
  },
  header: {
    marginTop: Metrics.verticalScale(1),
    marginBottom: Metrics.verticalScale(13),
    backgroundColor: '#ab84a2',
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: '#ab84a2',
    flexDirection: 'row',
    flexBasis: 'auto',
  },
  title: {
    color: 'black',
    fontFamily: 'RubikWetPaint',
    flex: 1,
    textAlign: 'center',
    margin: Metrics.verticalScale(10),
    fontSize: Metrics.verticalScale(12),
  },
  author: {
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    fontSize: Metrics.moderateScale(8),
    textAlign: 'center',
    margin: Metrics.verticalScale(10),
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    borderRadius: 20,
    borderWidth: 3,            // Reunuksen leveys
    borderColor: '#b0a1ae',  // Reunuksen väri
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Metrics.moderateScale(12),
    padding: Metrics.verticalScale(10), 
    // Varjo iOS-laitteilla
    shadowColor: '#f3baec',                
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Varjo Android-laitteilla
    elevation: 4                        
},
  row: {
    marginTop: Metrics.verticalScale(20),
    padding: Metrics.scale(10),
  },
  flex: {
    flexDirection: "row"
  },
  buttonContainer: {
    justifyContent: 'center', // Keskittää pystysuunnassa
    alignItems: 'center',     // Keskittää vaakasuunnassa
  },
  button: {
    margin: Metrics.verticalScale(10),
    flexDirection: "row",
    padding: Metrics.scale(10),
    backgroundColor: "#e1b9da",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    width: Metrics.scale(110),
    borderRadius: Metrics.scale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: Metrics.moderateScale(12),
    textAlign: 'center',
    marginVertical: Metrics.verticalScale(10),
    flexWrap: 'wrap',         
    width: '100%',                
    fontFamily: 'RubikWetPaint',
},
pointsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Metrics.verticalScale(10),
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent:'center'
  },
  Textinput: {
    height: Metrics.verticalScale(35),           
    width: '60%',                                
    backgroundColor: '#f0f0f0',                 
    borderRadius: 10,                            
    paddingHorizontal: Metrics.scale(15),        
    fontSize: Metrics.moderateScale(16),         
    color: '#333',                               
    marginVertical: Metrics.verticalScale(10),   
    borderColor: '#ccc',                         
    borderWidth: 1,                              
    shadowColor: '#433944',                         
    shadowOffset: { width: 0, height: 2 },       
    shadowOpacity: 0.4,                          
    shadowRadius: 5,                             
    elevation: 3,                             
  },
  scoreListContainer: {
    flex: 0.9,
    width: '100%',
    paddingTop: 10,
  },
  scoreItem: {
    backgroundColor: '#f0f0f0',              
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,                        
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  scoreText: {
    fontSize: Metrics.moderateScale(12),
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
});
