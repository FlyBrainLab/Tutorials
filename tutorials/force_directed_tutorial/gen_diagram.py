import networkx as nx
import random
import time

def generate_graph(client):
    G3 = client.get_neuron_graph()
    Gpart = client.NLP_result.graph
    G  = G3
    G2 = nx.DiGraph()
    for i in G.nodes():
        G2.add_node(i)
        G2.nodes[i]['label'] = G.nodes[i]['uname']
        G2.nodes[i]['rid'] = list(Gpart.successors(i))[0]
    for i,j in G.edges():
        G2.add_edge(i,j)

    nodes = list(G.nodes())
    for node in nodes:
        chars = '0123456789ABCDEF'
        color = '#'+''.join(random.sample(chars,6))
        a = {'data': {'commands': {'setcolor': [[G2.nodes[node]['rid']], color]} },'messageType': 'Command','widget': 'NLP'}
        client.tryComms(a)
        G2.nodes[node]['color'] = color
    for i in G.nodes():
        G2.add_node(i)
    for i,j in G.edges():
        G2.add_edge(i,j)
    nx.write_gexf(G2,'ex.gexf')
    time.sleep(1)
    with open('ex.gexf') as f:
        graph_data = f.read()
    data = """
    window._neuGFX.loadrawGEXF(`
DATA
`)
"""
    data = data.replace('DATA', graph_data)
    client.tryComms({'widget':'GFX', 
                        'messageType': 'eval', 
                        'data': {'data':data}})