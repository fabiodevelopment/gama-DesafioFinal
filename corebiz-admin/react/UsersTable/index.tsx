import React, { Component } from 'react'
import { Table } from 'vtex.styleguide'
import axios from 'axios'
import { withRuntimeContext } from 'vtex.render-runtime'

interface Props {
  runtime: any
}

// interface IOrder {
//   orderId: string;
// }

// interface IItem {
//   additionalInfo: {
//     categories: [{
//       name: string
//     }]
//   }
// }

interface ILead {
  name: string;
  email: string;
  phone: string;
  dateLead: string;
  dateClient?: string;
  favoriteCategory?: string;
}
class UsersTable extends Component<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      items: [],
      tableDensity: 'low',
    }
  }

  async componentDidMount() {
    const leads = await this.getLeads() as ILead[];
    const newLeads: ILead[] = [];
    
    leads.map(async item => {
      // this.getCategories(item);
        
        // const favoriteCategory = await this.getFavoriteCategory(categories!)
        // console.log(favoriteCategory)

      // console.log(categories.length)

      // const favoriteCategory = await this.getFavoriteCategory(categories);

      // console.log(favoriteCategory)

      newLeads.push({
        name: item.name,
        email: item.email,
        phone: item.phone,
        dateLead: new Date(item.dateLead).toLocaleDateString(),
        dateClient: item.dateClient ? (new Date(item.dateClient).toLocaleDateString()) : '-',
        // favoriteCategory: favoriteCategory,
      })
    })
    this.setState({ 
      items: newLeads
    })
  }

  private getLeads = async ()  => {
    const response = await axios.get('https://azzk045g2g.execute-api.us-east-2.amazonaws.com/leads');
    return response.data.Items;
  }

  // private getCategories = async (item: ILead) => {
  //   if(!item.dateClient){
  //     return ['-'];
  //   } else {

  //   }
  // }

  // private getOrders = async (email: string) => {
  //   const response = await axios.get(`https://grupo12antonio--hiringcoders202112.myvtex.com/api/oms/pvt/orders?q=${email}`);
  //   return response.data.list as IOrder[];
  // }

  // private getItems = async (orderId: string) => {
  //   const response = await axios.get(`https://grupo12antonio--hiringcoders202112.myvtex.com/api/oms/pvt/orders/${orderId}`);
  //   return response.data.items as [];
  // }

  // private getCategory = (item: IItem) => {
  //   return item.additionalInfo.categories[0].name as string;
  // }

  // private getFavoriteCategory = async (cats: string[]) => {
  //   const fav = cats.sort((a,b) =>
  //   cats.filter(v => v===a).length
  //   - cats.filter(v => v===b).length
  //   ).pop();
  //   console.log(fav)
  //   return fav;
  // }

  private getSchema() {
    const { tableDensity }: any = this.state;

    let fontSize = 'f5'

    switch (tableDensity) {
      case 'low': {
        fontSize = 'f5'
        break
      }
      case 'medium': {
        fontSize = 'f6'
        break
      }
      case 'high': {
        fontSize = 'f7'
        break
      }
      default: {
        fontSize = 'f5'
        break
      }
    }
    return {
      properties: {
        name: {
          title: 'Nome',
        },
        email: {
          title: 'E-mail',
          cellRenderer: ({ cellData }: any) => {
            return <span className="ws-normal">{cellData}</span>
          },
        },
        phone: {
          title: 'Telefone',
          cellRenderer: ({ cellData }: any) => {
            return <span className={`ws-normal ${fontSize}`}>{cellData}</span>
          },
        },
        dateLead: {
          title: 'Data de cadastro',
          cellRenderer: ({ cellData }: any) => {
            return <span className={`ws-normal ${fontSize}`}>{cellData}</span>
          },
        },
        dateClient: {
          title: 'Primeira compra',
          cellRenderer: ({ cellData }: any) => {
            return <span className={`ws-normal ${fontSize}`}>{cellData}</span>
          },
        },
        // favoriteCategory: {
        //   title: 'Categoria favorita',
        //   cellRenderer: ({ cellData }: any) => {
        //     return <span className={`ws-normal ${fontSize}`}>{cellData}</span>
        //   },
        // },
      },
    }
  }

  public render() {
    const {
      items,
      tableDensity,
    }: any = this.state

    return (
      <div>
        {items.length > 0 ? 
        (<Table
          fullWidth
          updateTableKey={tableDensity}
          items={items}
          schema={this.getSchema()}
          density="low"
          
          toolbar={{
            density: {
              buttonLabel: 'Densidade da linha',
              lowOptionLabel: 'Baixa',
              mediumOptionLabel: 'Média',
              highOptionLabel: 'Alta',
              handleCallback: (density: string) =>
                this.setState({ tableDensity: density }),
            },
            fields: {
              label: 'Alternar campos visíveis',
              showAllLabel: 'Mostrar tudo',
              hideAllLabel: 'Ocultar tudo',
            }
          }}
          
        />):
        <p>Carregando...</p>
        }
      </div>
    )
  }
}

export default withRuntimeContext(UsersTable)
