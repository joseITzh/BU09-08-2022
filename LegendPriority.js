import '../../LegendPriority.css'


const LegendPriority = () => {

return ( 
<div>
    <table className="legend_table2">
      <thead>
        <tr>
        <th className='legend_th'>Priorities</th>
        <th className='legend_th'>Meaning</th>
        </tr>
      </thead>
      <tbody>
        <tr><td className='legend_td'>URGENT</td><td className='legend_td'>Should be fixed within the next hours.</td></tr>
        <tr><td className='legend_td'>MEDIUM</td><td className='legend_td'>Should be fixed within 2 days.</td></tr>
        <tr><td className='legend_td'>LOW</td><td className='legend_td'>Should be fixed within 4 days.</td></tr>
      </tbody>
    </table>
</div>
)
}

export default LegendPriority;
