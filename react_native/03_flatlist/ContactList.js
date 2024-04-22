import {useState} from 'react';
import {View,Text,Pressable,FlatList,StyleSheet} from 'react-native';

const ContactList = () => {
	
	const [state,setState] = useState({
		data:[
	{
		"firstname": "Chase",
		"lastname": "Buckner",
		"id": 1
	},
	{
		"firstname": "Donna",
		"lastname": "Jenkins",
		"id": 2
	},
	{
		"firstname": "Simone",
		"lastname": "Guy",
		"id": 3
	},
	{
		"firstname": "Shoshana",
		"lastname": "Mcpherson",
		"id": 4
	},
	{
		"firstname": "Rae",
		"lastname": "Garza",
		"id": 5
	},
	{
		"firstname": "Hilel",
		"lastname": "Travis",
		"id": 6
	},
	{
		"firstname": "September",
		"lastname": "Thomas",
		"id": 7
	},
	{
		"firstname": "Joy",
		"lastname": "Duke",
		"id": 8
	},
	{
		"firstname": "Rhoda",
		"lastname": "Zamora",
		"id": 9
	},
	{
		"firstname": "Rajah",
		"lastname": "Pierce",
		"id": 10
	},
	{
		"firstname": "Kay",
		"lastname": "Whitfield",
		"id": 11
	},
	{
		"firstname": "Calista",
		"lastname": "Torres",
		"id": 12
	},
	{
		"firstname": "Shoshana",
		"lastname": "Wells",
		"id": 13
	},
	{
		"firstname": "Kylynn",
		"lastname": "Monroe",
		"id": 14
	},
	{
		"firstname": "Matthew",
		"lastname": "Conrad",
		"id": 15
	},
	{
		"firstname": "Caldwell",
		"lastname": "Raymond",
		"id": 16
	},
	{
		"firstname": "Xanthus",
		"lastname": "Woodward",
		"id": 17
	},
	{
		"firstname": "Stacy",
		"lastname": "Blair",
		"id": 18
	},
	{
		"firstname": "Chancellor",
		"lastname": "Carr",
		"id": 19
	},
	{
		"firstname": "Octavius",
		"lastname": "Schmidt",
		"id": 20
	},
	{
		"firstname": "Hayley",
		"lastname": "Ratliff",
		"id": 21
	},
	{
		"firstname": "Xyla",
		"lastname": "Bolton",
		"id": 22
	},
	{
		"firstname": "Rose",
		"lastname": "Gould",
		"id": 23
	},
	{
		"firstname": "Ignatius",
		"lastname": "Long",
		"id": 24
	},
	{
		"firstname": "Mohammad",
		"lastname": "Lindsay",
		"id": 25
	},
	{
		"firstname": "Ori",
		"lastname": "Maddox",
		"id": 26
	},
	{
		"firstname": "Armand",
		"lastname": "Ferrell",
		"id": 27
	},
	{
		"firstname": "Rafael",
		"lastname": "Dodson",
		"id": 28
	},
	{
		"firstname": "Brendan",
		"lastname": "Buck",
		"id": 29
	},
	{
		"firstname": "Christen",
		"lastname": "Newman",
		"id": 30
	},
	{
		"firstname": "Anjolie",
		"lastname": "Hogan",
		"id": 31
	},
	{
		"firstname": "Lucy",
		"lastname": "Holloway",
		"id": 32
	},
	{
		"firstname": "Stephen",
		"lastname": "Reese",
		"id": 33
	},
	{
		"firstname": "Dustin",
		"lastname": "Woodard",
		"id": 34
	},
	{
		"firstname": "Kim",
		"lastname": "Barron",
		"id": 35
	},
	{
		"firstname": "Elton",
		"lastname": "Rodgers",
		"id": 36
	},
	{
		"firstname": "Jemima",
		"lastname": "Pierce",
		"id": 37
	},
	{
		"firstname": "Joshua",
		"lastname": "Parrish",
		"id": 38
	},
	{
		"firstname": "Tanisha",
		"lastname": "Carroll",
		"id": 39
	},
	{
		"firstname": "Courtney",
		"lastname": "Harrington",
		"id": 40
	},
	{
		"firstname": "Cally",
		"lastname": "Cooper",
		"id": 41
	},
	{
		"firstname": "Aline",
		"lastname": "Alvarez",
		"id": 42
	},
	{
		"firstname": "Acton",
		"lastname": "William",
		"id": 43
	},
	{
		"firstname": "Len",
		"lastname": "Marsh",
		"id": 44
	},
	{
		"firstname": "Alec",
		"lastname": "Bullock",
		"id": 45
	},
	{
		"firstname": "Ivor",
		"lastname": "Barber",
		"id": 46
	},
	{
		"firstname": "Jerome",
		"lastname": "Estrada",
		"id": 47
	},
	{
		"firstname": "Mikayla",
		"lastname": "Ramsey",
		"id": 48
	},
	{
		"firstname": "David",
		"lastname": "Soto",
		"id": 49
	},
	{
		"firstname": "Chaim",
		"lastname": "Frazier",
		"id": 50
	},
	{
		"firstname": "Oren",
		"lastname": "Cohen",
		"id": 51
	},
	{
		"firstname": "Rhonda",
		"lastname": "Scott",
		"id": 52
	},
	{
		"firstname": "Gloria",
		"lastname": "Harper",
		"id": 53
	},
	{
		"firstname": "Justine",
		"lastname": "Wooten",
		"id": 54
	},
	{
		"firstname": "Vaughan",
		"lastname": "Bright",
		"id": 55
	},
	{
		"firstname": "Lara",
		"lastname": "Wynn",
		"id": 56
	},
	{
		"firstname": "Raymond",
		"lastname": "Greene",
		"id": 57
	},
	{
		"firstname": "Odysseus",
		"lastname": "Hansen",
		"id": 58
	},
	{
		"firstname": "Joshua",
		"lastname": "Smith",
		"id": 59
	},
	{
		"firstname": "Keegan",
		"lastname": "Rogers",
		"id": 60
	},
	{
		"firstname": "Lara",
		"lastname": "Conway",
		"id": 61
	},
	{
		"firstname": "Thomas",
		"lastname": "Patterson",
		"id": 62
	},
	{
		"firstname": "Kay",
		"lastname": "Mcdowell",
		"id": 63
	},
	{
		"firstname": "Lucy",
		"lastname": "Ball",
		"id": 64
	},
	{
		"firstname": "Cassady",
		"lastname": "Cline",
		"id": 65
	},
	{
		"firstname": "Aiko",
		"lastname": "Lynch",
		"id": 66
	},
	{
		"firstname": "Portia",
		"lastname": "Sutton",
		"id": 67
	},
	{
		"firstname": "Colorado",
		"lastname": "Mendez",
		"id": 68
	},
	{
		"firstname": "Idola",
		"lastname": "Hickman",
		"id": 69
	},
	{
		"firstname": "Macy",
		"lastname": "Cash",
		"id": 70
	},
	{
		"firstname": "Asher",
		"lastname": "Duran",
		"id": 71
	},
	{
		"firstname": "Samuel",
		"lastname": "Dean",
		"id": 72
	},
	{
		"firstname": "Jocelyn",
		"lastname": "Mclean",
		"id": 73
	},
	{
		"firstname": "Sigourney",
		"lastname": "Fischer",
		"id": 74
	},
	{
		"firstname": "Ali",
		"lastname": "Spears",
		"id": 75
	},
	{
		"firstname": "Coby",
		"lastname": "Franco",
		"id": 76
	},
	{
		"firstname": "Tad",
		"lastname": "Tanner",
		"id": 77
	},
	{
		"firstname": "Dexter",
		"lastname": "Warner",
		"id": 78
	},
	{
		"firstname": "Barclay",
		"lastname": "Wallace",
		"id": 79
	},
	{
		"firstname": "Rudyard",
		"lastname": "Hodge",
		"id": 80
	},
	{
		"firstname": "Harding",
		"lastname": "Mcclain",
		"id": 81
	},
	{
		"firstname": "Rebekah",
		"lastname": "Wilder",
		"id": 82
	},
	{
		"firstname": "Theodore",
		"lastname": "Sutton",
		"id": 83
	},
	{
		"firstname": "Sean",
		"lastname": "Clements",
		"id": 84
	},
	{
		"firstname": "Joy",
		"lastname": "Cline",
		"id": 85
	},
	{
		"firstname": "Liberty",
		"lastname": "Coffey",
		"id": 86
	},
	{
		"firstname": "Wing",
		"lastname": "Rogers",
		"id": 87
	},
	{
		"firstname": "Gray",
		"lastname": "Montgomery",
		"id": 88
	},
	{
		"firstname": "Luke",
		"lastname": "Hartman",
		"id": 89
	},
	{
		"firstname": "Neil",
		"lastname": "Spence",
		"id": 90
	},
	{
		"firstname": "Hu",
		"lastname": "Carpenter",
		"id": 91
	},
	{
		"firstname": "Colleen",
		"lastname": "Rodriguez",
		"id": 92
	},
	{
		"firstname": "Logan",
		"lastname": "Collier",
		"id": 93
	},
	{
		"firstname": "Tobias",
		"lastname": "Abbott",
		"id": 94
	},
	{
		"firstname": "Kenyon",
		"lastname": "Galloway",
		"id": 95
	},
	{
		"firstname": "Kirestin",
		"lastname": "Duke",
		"id": 96
	},
	{
		"firstname": "Madeson",
		"lastname": "Wilcox",
		"id": 97
	},
	{
		"firstname": "Paul",
		"lastname": "Washington",
		"id": 98
	},
	{
		"firstname": "Arden",
		"lastname": "Hartman",
		"id": 99
	},
	{
		"firstname": "Ignatius",
		"lastname": "Pace",
		"id": 100
	}
]
	})
	
	const removeContact = (id) => {
		setState((state) => {
			let tempList = state.data.filter(contact => contact.id !== id)
			return {
				data:tempList
			}
		})
	}
	
	return(
		<View>
			<FlatList data={state.data}
						renderItem={({item}) => {
							return(
								<View style={styles.rowStyle}>
									<Text style={styles.textStyle}>
										{item.firstname} {item.lastname}
									</Text>
									<Pressable style={styles.buttonStyle}
										onPress={() => removeContact(item.id)}>
										<Text>Remove</Text>
									</Pressable>
								</View>
							)
						}}/>
		</View>
	)
}

const styles = StyleSheet.create({
	rowStyle:{
		flexDirection:"row",
		height:80,
		alignItems:"center",
		justifyContent:"space-between"
	},
	textStyle:{
		fontFamily:"sans-serif",
		fontSize:18,
		fontWeight:"bold"
	},
	buttonStyle:{
		width:80,
		height:50,
		borderRadius:5,
		backgroundColor:"red",
		alignItems:"center",
		justifyContent:"center"
	}
})

export default ContactList;