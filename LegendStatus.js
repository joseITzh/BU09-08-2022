import '../../LegendStatus.css'
import '../styles/Dashboard.css'

const LegendStatus = () => {

   return ( 
<div>
    <table className="legend_table1">
      <thead>
        <tr>
        <th className='legend_th'>Statuses</th>
        <th className='legend_th'>Meaning</th>
        </tr>
      </thead>
      <tbody>
        <tr><td className='legend_td'>NEW</td><td className='legend_td'>The initial status of a ticket after you create it or insert it.</td></tr>
        <tr><td className='legend_td'>INPROG</td><td className='legend_td'>In progress. Someone is working on this ticket. </td></tr>
        <tr><td className='legend_td'>CLOSED</td><td className='legend_td'>Was more of an error site.</td></tr>
      </tbody>
    </table>
</div>
)
}

export default LegendStatus;
