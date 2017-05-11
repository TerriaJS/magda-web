import React, { Component } from 'react';
class TemporalAspectViewer extends Component {
    render(){
       const rows = this.props.data ? this.props.data.intervals : [];
      return <div className='temporal-aspect-viewer white-box'>
                <table className="table">
                    <tbody>
                            <tr>
                                <th>End</th>
                                <th>Start</th>
                            </tr>
                    {
                        rows.map((r)=>
                        <tr key={r}>
                            <td className="" >{new Date(r.end).toLocaleString()}</td>
                            <td className="" key={"start"}>{new Date(r.start).toLocaleString()}</td></tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
    }
}

TemporalAspectViewer.propTypes = {
  data: React.PropTypes.object
}

export default TemporalAspectViewer;
