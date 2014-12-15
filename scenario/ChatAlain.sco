{
	"name": "ChatAlain",
	"type": "block",
	"xml": "<block type=\"controls_repeat_forever\" id=\"1\" x=\"511\" y=\"149\"><statement name=\"DO\"><block type=\"controls_if\" id=\"2\" inline=\"false\"><value name=\"IF0\"><block type=\"logic_compare\" id=\"14\" inline=\"true\"><field name=\"OP\">GT</field><value name=\"A\"><block type=\"analog_sensor\" id=\"6\"><field name=\"CHANNEL\">an0</field><field name=\"PROFILE\">IDENTITY</field></block></value><value name=\"B\"><block type=\"math_number\" id=\"33\"><field name=\"NUM\">3</field></block></value></block></value><statement name=\"DO0\"><block type=\"video_play\" id=\"4\"><field name=\"VIDEO\">kitten.mp4</field><field name=\"SYNC\">True</field></block></statement></block></statement></block>",
	"code": "def run():\n  from griotte.scenario.analog import set_profile\n  from griotte.scenario.analog import get_analog\n  from griotte.scenario.video import play_video\n  \n  set_profile('an0','IDENTITY')\n  \n  \n  while (True):\n    if get_analog('an0') > 3:\n      play_video('kitten.mp4', sync=True)\n  \n\n\nif __name__ == \"__main__\":\n  from griotte.config import Config\n  Config(\"DEFAULT\")\n  run()"
}
