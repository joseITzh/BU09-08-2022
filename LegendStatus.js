import '../../LegendStatus.css'

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
        <tr><td className='legend_td'>QUEUED</td><td className='legend_td'>Ticket ownership has been assigned to a person or a group.</td></tr>
        <tr><td className='legend_td'>INPROG</td><td className='legend_td'>In progress. Someone is working on this ticket. </td></tr>
        <tr><td className='legend_td'>RESOLVED</td><td className='legend_td'>A solution has been provided.</td></tr>
        <tr><td className='legend_td'>CLOSED</td><td className='legend_td'>Ticket is closed.</td></tr>
      </tbody>
    </table>
</div>
)
}

export default LegendStatus;
